import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartOrder, CartProduct } from '../models/cart.model';
import { Order, OrderedProducts } from '../models/order.model';
import { TokenService } from './token.service';
import { api } from '../../environments/environment';
import { ModalService } from './modal.service';
import { ModalComponent } from '../modal/modal.component';

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

  constructor(
    private _tokenService: TokenService,
    private _httpClient: HttpClient,
    private _modalService: ModalService
  ) {}
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
  }

  removeFromCart(productId: number, sizeId: number): void {
    this._cartProduct = this._cartProduct.filter((p) => {
      if (p.productId === productId) {
        if (p.sizeId === sizeId) {
          if (p.quantity > 1) {
            this._cartLength = this._cartLength - 1;
            this._$cartLength.next(this._cartLength);
            return (p.quantity = p.quantity - 1);
          } else {
            this._cartLength = this._cartLength - 1;
            this._$cartLength.next(this._cartLength);
            return false;
          }
        } else {
          return true;
        }
      }
      return true;
    });
    // Émettre une nouvelle valeur pour le panier
    this._$cartProduct.next(this._cartProduct);
  }

  createCommand() {
    let order: CartOrder = {
      userId: this._tokenService.readToken().id,
      totalReduction: 0.2,
      orderProduct: this._cartProduct,
    };
    console.log(order);
    this._httpClient
      .post(`${api.url}/order`, order)
      .subscribe((res) => console.log(res));
  }
}
