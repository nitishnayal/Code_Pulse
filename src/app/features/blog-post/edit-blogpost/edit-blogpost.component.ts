import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../services/blog-post.service';
import { response, } from 'express';
import { BlogPost } from '../models/blog-post.model';
import { FormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../../categorty/services/category.service';
import { category } from '../../categorty/models/category.model';
import { UpdateBlogPost } from '../models/Update-blog-post.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';

@Component({
  selector: 'app-edit-blogpost',
  imports: [FormsModule, MarkdownModule, CommonModule, ImageSelectorComponent],
  templateUrl: './edit-blogpost.component.html',
  styleUrl: './edit-blogpost.component.css',
})
export class EditBlogpostComponent implements OnInit, OnDestroy {
  id: string | null = null;
  model?: BlogPost;
  categories$? : Observable<category[]>;
  selectedcategories?:string[]
  isImageSelectorVisible : boolean  = false;

  routeSubscription?: Subscription;
  updateBlogPostSubscription?:Subscription;
  getBlogPostSubscription?:Subscription;
  DeleteBlogPostSubscription?:Subscription;
  imageSelectSubscription?:Subscription;

  constructor(
    private route: ActivatedRoute,
    private blogPostService: BlogPostService,
    private router:Router,
    private categorySerice : CategoryService,
    private imageService:ImageService
    ){}

   

  ngOnInit(): void {

    this.categories$ = this.categorySerice.getAllCategories();


    this.routeSubscription = this.route.paramMap.subscribe({
      next: (params) => {
        this.id = params.get('id');

        //Get BlogPost From API
        if (this.id) {
          this.getBlogPostSubscription = this.blogPostService.getBlogPostById(this.id).subscribe({
            next: (response) => {
              this.model = response;
              this.selectedcategories = response.categories.map(x => x.id);
            }
          });
        }

        
        this.imageSelectSubscription = this.imageService.onSelectedImage()
        .subscribe({
          next:(response)=>{
            if(this.model){
              this.model.featuredImageUrl = response.url;
              this.isImageSelectorVisible = false;
            }
          }
        })


      },
    });
  }

  onFormSubmit(): void 
  {
    //Convert this model to request object
    if(this.model && this.id)
    {
      var updateBlogPost:UpdateBlogPost = {
        author: this.model.author,
        content:this.model.content,
        shortDescription:this.model.shortDescription,
        featuredImageUrl:this.model.featuredImageUrl,
        isVisible:this.model.isVisible,
        publishedDate:this.model.publishedDate,
        title:this.model.title,
        urlHandle:this.model.urlHandle,
        categories:this.selectedcategories ?? []

      };

      this.updateBlogPostSubscription = this.blogPostService.updateBlogPost(this.id,updateBlogPost)
      .subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      });


    }


  }


  OnDelete():void
  {
    if(this.id)
    {
      //call service & delete blogpost
      this.DeleteBlogPostSubscription = this.blogPostService.deleteBlogPost(this.id)
      .subscribe({
        next: (response) =>{
          this.router.navigateByUrl('/admin/blogposts');
        }
      });
    }

  }

  OpenImageselectorMethod():void{
    this.isImageSelectorVisible = true;
  }

  CloseImageSelector():void{
    this.isImageSelectorVisible= false;

  }
  

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.updateBlogPostSubscription?.unsubscribe();
    this.getBlogPostSubscription?.unsubscribe();
    this.DeleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
