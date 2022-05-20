import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductRequestModel, ProductResponseModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private url = environment.BackendUrl;
  private api = { products: `${this.url}/products` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<ProductResponseModel[]> {
    return this.http.get<ProductResponseModel[]>(this.api.products);
  }

  getAllByCategory(name: string): Observable<ProductResponseModel[]> {
    return this.http.get<ProductResponseModel[]>(`${this.api.products}?category.path=${name}`);
  }

  getOne(id: number): Observable<ProductResponseModel> {
    return this.http.get<ProductResponseModel>(`${this.api.products}/${id}`);
  }

  create(product: ProductRequestModel): Observable<ProductResponseModel> {
    return this.http.post<ProductResponseModel>(this.api.products, product);
  }

  update(product: ProductRequestModel, id: number): Observable<ProductResponseModel> {
    return this.http.patch<ProductResponseModel>(`${this.api.products}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.products}/${id}`);
  }

}
