import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { Product } from '../models/product.model';
import { Response } from '../models/response.model';
import { Filter } from '../models/filter.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private _httpClient: HttpClient) {}

  getAll(): Observable<Response<Product[]>> {
    return this._httpClient.get<Response<Product[]>>(`${api.url}/product`);
  }

  filter(filter: Filter): Observable<Response<Product[]>> {
    const params = new HttpParams({
      fromObject: { ...filter },
    });
    return this._httpClient
      .get<Response<Product[]>>(`${api.url}/product/search/filter`, { params })
      .pipe(
        map((res) => {
          return res;
        })
      );
  }
}
