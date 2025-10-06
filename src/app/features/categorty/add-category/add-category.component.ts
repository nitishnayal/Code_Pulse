import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { addcategoryrequest } from '../models/add-category-request.model';
import { CategoryService } from '../services/category.service';
import { HttpClientModule } from '@angular/common/http';
import { response } from 'express';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  imports: [FormsModule,HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent implements OnDestroy{

  model:addcategoryrequest

  private addCategorySubscription?: Subscription;

  constructor(private categoryService : CategoryService,private router:Router){
    this.model={
      name:'',
      urlhandle:''
    };
  }


  
  
  onFormSubmit(){
    
    this.addCategorySubscription = this.categoryService.addcategory(this.model)
    .subscribe({
      next:(response) =>{
        this.router.navigateByUrl('/admin/categories');
      }
    })
    
  }


  ngOnDestroy(): void {

    this.addCategorySubscription?.unsubscribe();
   
  }

}
