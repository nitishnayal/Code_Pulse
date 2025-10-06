import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BlogPostService } from '../services/blog-post.service';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterModule,CommonModule,FormsModule],
  templateUrl: './blogpost-list.component.html',
  styleUrl: './blogpost-list.component.css'
})
export class BlogpostListComponent implements OnInit{

  blogPosts$?:Observable<BlogPost[]>;

  constructor(private blogPostService:BlogPostService){}


  ngOnInit(): void {
    //get all blog posts from API
    this.blogPosts$ = this.blogPostService.getAllBlogPosts();

  }

}
