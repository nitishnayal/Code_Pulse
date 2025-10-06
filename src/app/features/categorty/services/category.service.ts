import { Injectable } from '@angular/core';
import { addcategoryrequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { category } from '../models/category.model';
import { ok } from 'assert';
import { environment } from '../../../../environments/environment';
import { UpdatecategoryRequest } from '../models/update-category-request.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }



  addcategory(model : addcategoryrequest) : Observable<void>
  {

    return this.http.post<void>(`${environment.apiBaseUrl}/api/Categories`,model)

  }





  getAllCategories() : Observable<category[]>
  {
    return this.http.get<category[]>(`${environment.apiBaseUrl}/api/Categories`);
  }
  


  getCategoryById(id:string):Observable<category>{
    return this.http.get<category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }


  updatecategory(id:string, updatecategoryRequest:UpdatecategoryRequest):Observable<category>
  {
    return this.http.put<category>(`${environment.apiBaseUrl}/api/Categories/${id}`,updatecategoryRequest);
  }


  deletecategory(id:string) : Observable<category>{
    return this.http.delete<category>(`${environment.apiBaseUrl}/api/Categories/${id}`);
  }


  
}
