import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CartProduct } from '../models/cart.model';
import { api } from '../../environments/environment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProduct: CartProduct[] = [];
  totalPrice: number = 0;
  imageUrl: string = api.imgUrl;
  isAlertOpen = false;
  alertButtons = ['Fermer'];
  constructor(private _cartService: CartService) {}

  ngOnInit() {
    this._cartService.$cartProduct.subscribe({
      next: (products) => {
        (this.cartProduct = products),
          products.map((p) => {
            this.totalPrice = this.totalPrice + p.price * p.quantity;
          });
      },
    });
  }

  removeProduct(productId: number, sizeId: number) {
    this._cartService.removeFromCart(productId, sizeId);
  }

  command(){
    this.setOpen(true);
  }
 

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
}
