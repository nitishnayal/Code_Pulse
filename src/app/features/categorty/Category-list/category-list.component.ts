import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CategoryService } from '../services/category.service';
import { category } from '../models/category.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-list',
  imports: [RouterLink,HttpClientModule,CommonModule],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.css'
})
export class CategoryListComponent implements OnInit{

  categories$? : Observable<category[]>;

  constructor(private categoryService : CategoryService){}



  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    // .subscribe({
    //   next : (response)=>{
    //     this.categories = response
    //   }
    // })
  }

}
