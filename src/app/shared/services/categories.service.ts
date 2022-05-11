import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CategoryRequestModel, CategoryResponseModel } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private url = environment.BackendUrl;
  private api = { categories: `${this.url}/categories` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<CategoryResponseModel[]> {
    return this.http.get<CategoryResponseModel[]>(this.api.categories);
  }

  create(discount: CategoryRequestModel): Observable<CategoryResponseModel> {
    return this.http.post<CategoryResponseModel>(this.api.categories, discount);
  }

  update(discount: CategoryRequestModel, id: number): Observable<CategoryResponseModel> {
    return this.http.patch<CategoryResponseModel>(`${this.api.categories}/${id}`, discount);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.categories}/${id}`);
  }
}
