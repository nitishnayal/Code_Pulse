import { Component, NgModule, OnDestroy, OnInit, Pipe } from '@angular/core';
import { AddBlogPost } from '../models/add-blog-post.model';
import { FormsModule } from '@angular/forms';
import { Observable, pipe, Subscription } from 'rxjs';
import { pipeline } from 'stream';
import { BlogPostService } from '../services/blog-post.service';
import { response } from 'express';
import { Router } from '@angular/router';
import { CommonModule, formatDate } from '@angular/common';
 import { MarkdownModule } from 'ngx-markdown';
import { CategoryService } from '../../categorty/services/category.service';
import { category } from '../../categorty/models/category.model';
import { ImageSelectorComponent } from "../../../shared/components/image-selector/image-selector.component";
import { ImageService } from '../../../shared/components/image-selector/image.service';
 

@Component({
  selector: 'app-add-blogpost',
  standalone: true,
  imports: [FormsModule, MarkdownModule, CommonModule, ImageSelectorComponent],
  templateUrl: './add-blogpost.component.html',
  styleUrl: './add-blogpost.component.css'
})
export class AddBlogpostComponent implements OnInit,OnDestroy{


  model:AddBlogPost;
  isImageSelectorVisible : boolean  = false;
  categories$?:Observable<category[]>;

  imageSelectorsubscription?:Subscription;


  constructor(private blogpostService : BlogPostService ,
     private router:Router,
     private categoryService:CategoryService,
     private imageService:ImageService
  ){
    this.model={
      title:'',
      shortDescription:'',
      urlHandle:'',
      content:'',
      featuredImageUrl:'',
      author:'',
      isVisible:true,
      publishedDate: formatDate(new Date(), 'yyyy-MM-dd', 'en-IN'),
      categories:[]
    };
  }
  



  ngOnInit(): void {

    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectorsubscription = this.imageService.onSelectedImage()
    .subscribe({
      next:(selectedImage) =>{
        this.model.featuredImageUrl = selectedImage.url;
        this.CloseImageSelector();
      }
    })

    
  }



  onFormSubmit():void{
    console.log(this.model);
    this.blogpostService.createBlogPost(this.model)
    .subscribe({
      next: (response) =>{
        this.router.navigateByUrl('/admin/blogposts');
      }
    });

  }



  OpenImageselectorMethod():void{
    this.isImageSelectorVisible = true;
  }

  CloseImageSelector():void{
    this.isImageSelectorVisible= false;

  }


  ngOnDestroy(): void {
    this.imageSelectorsubscription?.unsubscribe();
  }



  

}
