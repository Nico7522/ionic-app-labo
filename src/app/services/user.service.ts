import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../environments/environment';
import { Observable, map } from 'rxjs';
import { User } from '../models/user.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private _httpClient: HttpClient) {}

  getById(userId: number): Observable<User> {
    return this._httpClient.get<User>(`${api.url}/user/${userId}`);
  }

  getOrders(userId: number): Observable<Order[]> {
    return this._httpClient.get<Order[]>(`${api.url}/order/${userId}`).pipe(
      map((orders) => {
        orders.map((o) => {
          o.orderedProducts.map((p) => {
            p.reductionPerProduct =
              Number(p.reductionPerProduct.toString().substring(2)) * 10;
          });
        });
        return orders;
      })
    );
  }
}
