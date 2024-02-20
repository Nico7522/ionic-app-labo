import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartOrder, CartProduct } from '../models/cart.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  private _order: CartOrder = { userId : 1, totalReduction : 0, orderProduct : []};
  private _$order: BehaviorSubject<CartOrder> = new BehaviorSubject<CartOrder>(this._order);
  $order = this._$order.asObservable();
  constructor(private _tokenService: TokenService) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

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
