import { Routes } from '@angular/router';

import { CategoryListComponent } from './features/categorty/Category-list/category-list.component';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { AddCategoryComponent } from './features/categorty/add-category/add-category.component';
import { EditCategoryComponent } from './features/categorty/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-post/blogpost-list/blogpost-list.component';
import { AddBlogpostComponent } from './features/blog-post/add-blogpost/add-blogpost.component';
import { EditBlogpostComponent } from './features/blog-post/edit-blogpost/edit-blogpost.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },

  {
    path: 'admin/categories',
    component: CategoryListComponent,
  },

  {
    path: 'admin/categories/Add',
    component: AddCategoryComponent,
  },

  {
    path: 'admin/categories/:id',
    component: EditCategoryComponent,
  },

  {
    path: 'admin/blogposts',
    component: BlogpostListComponent,
  },

  {
    path: 'admin/blogposts/add',
    component: AddBlogpostComponent,
  },

  {
    path: 'admin/blogposts/:id',
    component: EditBlogpostComponent,
  },
];
