import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiscountRequestModel, DiscountResponseModel } from '../models/discount.model';

@Injectable({
  providedIn: 'root'
})
export class DiscountsService {
  private url = environment.BackendUrl;
  private api = { discounts: `${this.url}/discounts` };

  constructor(private http: HttpClient) { }

  getAll(): Observable<DiscountResponseModel[]> {
    return this.http.get<DiscountResponseModel[]>(this.api.discounts);
  }

  getOne(id: number): Observable<DiscountResponseModel> {
    return this.http.get<DiscountResponseModel>(`${this.api.discounts}/${id}`);
  }

  create(discount: DiscountRequestModel): Observable<DiscountResponseModel> {
    return this.http.post<DiscountResponseModel>(this.api.discounts, discount);
  }

  update(discount: DiscountRequestModel, id: number): Observable<DiscountResponseModel> {
    return this.http.patch<DiscountResponseModel>(`${this.api.discounts}/${id}`, discount);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.discounts}/${id}`);
  }
}