import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartOrder, CartProduct } from '../models/cart.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class CartService implements OnInit {
  private _cartLength: number = 0;
  private _$cartLength: BehaviorSubject<number> = new BehaviorSubject(
    this._cartLength
  );
  $cart_length = this._$cartLength.asObservable();

  private _cartProduct: CartProduct[] = [];
  private _$cartProduct: BehaviorSubject<CartProduct[]> = new BehaviorSubject<
    CartProduct[]
  >(this._cartProduct);
  $cartProduct = this._$cartProduct.asObservable();

  constructor(private _tokenService: TokenService) {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  addToCart(product: CartProduct) {
    let canAdd = true;
    this._cartProduct.map((p) => {
      if (product.productId === p.productId && product.sizeId === p.sizeId) {
        p.quantity = p.quantity + 1;
        canAdd = false;
        this._cartLength++;
        this._$cartLength.next(this._cartLength);
      }
    });

    if (canAdd) {
      this._cartProduct.push(product);
      this._$cartProduct.next(this._cartProduct);
      this._cartLength++;
      this._$cartLength.next(this._cartLength);
    }
    this._$cartProduct.subscribe((o) => console.log(o));
    this.$cart_length.subscribe((l) => console.log('Taille du panier : ', l));
  }

  createCommand() {
    // POSTER LA COMMMANDE
  }
}
