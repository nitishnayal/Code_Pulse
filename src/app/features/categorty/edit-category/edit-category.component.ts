import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoryService } from '../services/category.service';
import { response } from 'express';
import { category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdatecategoryRequest } from '../models/update-category-request.model';

@Component({
  selector: 'app-edit-category',
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css'
})
export class EditCategoryComponent implements OnInit , OnDestroy {

  id: string | null = null;
  paramsSubscriptions?: Subscription;
  editCategorySubscription?:Subscription;
  category?:category;

  constructor(private route : ActivatedRoute ,  private categoryService : CategoryService ,private router:Router){}
  
  
  ngOnInit(): void {
    
    this.route.paramMap.subscribe({
      next: (params) =>{
        this.id = params.get('id');
         
        //get tha data from the API for this category id 
        if(this.id){
          this.categoryService.getCategoryById(this.id)
          .subscribe({
            next:(response) =>{
              this.category=response;

            }
          })
        }

      }

      
    });
    
  }

  
  
  onFormSubmit():void{
    const updatecategoryRequest : UpdatecategoryRequest = {
      name : this.category?.name ?? '',
      urlHandle: this.category?.urlHandle ?? ''
    };

    //pass this object to service
    if(this.id){
      this.editCategorySubscription = this.categoryService.updatecategory(this.id, updatecategoryRequest)
      .subscribe({
        next:(response) =>
        {
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }

  }

  OnDelete():void{
  
    if(this.id){
      this.categoryService.deletecategory(this.id)
      .subscribe({
        next:(response) =>{
          this.router.navigateByUrl('/admin/categories');
        }
      })
    }

  }

  
  ngOnDestroy(): void {
    
    this.paramsSubscriptions?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
  }


  

}
