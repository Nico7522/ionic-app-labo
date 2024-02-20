import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartOrder, CartProduct } from '../models/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private _order: CartOrder = { userId : 1, totalReduction : 0, orderProduct : []};
  private _$order: BehaviorSubject<CartOrder> = new BehaviorSubject<CartOrder>(this._order);
  $order = this._$order.asObservable();
  constructor() { }

  addToCart(product: CartProduct) {
    let canAdd = true;
      this._order.orderProduct.map(p => {
        if(product.productId === p.productId) {
          p.quantity = p.quantity + 1
          canAdd = false;
        }
  
      })

    

    if(canAdd) {
      this._order.orderProduct.push(product);
    }
    this._$order.next(this._order);
    this.$order.subscribe(o => console.log(o)
    )
  }

  createCommand(){
    // POSTER LA COMMMANDE
  }
}
