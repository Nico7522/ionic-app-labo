import { Component, OnInit } from '@angular/core';
import { AvailableSizes, Product } from '../models/product.model';
import { api } from '../../environments/environment';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { SizeselectmodalComponent } from '../sizeselectmodal/sizeselectmodal.component';
import { CartProduct } from '../models/cart.model';
import { CartService } from '../services/cart.service';
import { TokenService } from '../services/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  productId!: number;
  isTokenExist!: boolean;
  sizeId!: number;
  product!: Product;
  imageUrl: string = api.imgUrl;
  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _modalService: ModalService,
    private _cartService: CartService,
    private _tokenService: TokenService,
    private _router: Router,
    private _location: Location
  ) {}
  isAlertOpen = false;
  alertMessage: string = '';
  alertButtons = ['Fermer'];

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }
  ngOnInit() {
    this.productId = this._activatedRoute.snapshot.params['id'];
    this._productService.getById(this.productId).subscribe({
      next: (product) => {
        console.log(product);
        this.product = product.data;
      },
    });

    this._tokenService.$isTokenExist.subscribe(token => this.isTokenExist = token)
  }

  openModal() {
    this._modalService.openModal(SizeselectmodalComponent);
  }

  compareWith(o1: AvailableSizes, o2: AvailableSizes) {
    return o1.sizeId === o2.sizeId;
  }

  handleChange(ev: any) {
    this.sizeId = ev.target.value.sizeId;
  }

  addToCart(): void {

    if(!this.isTokenExist) {
      this.alertMessage = "Veuillez vous connectez";
      this.setOpen(true);
      return;
    }

    if (this.sizeId === undefined) {
      this.alertMessage = "Veuillez séléctionner une taille";
      this.setOpen(true);
      return;
    }
    const product: CartProduct = {
      modelName: this.product.modelName,
      sizeId: this.sizeId,
      productId: this.product.productId,
      price: this.product.price,
      discount: this.product.discount,
      quantity: 1,
      image: this.product.image,
    };

    this._cartService.addToCart(product);
  }

  trackItems(index: number, item: AvailableSizes) {
    return item.sizeId;
  }

  back() {
    let backPath: string = this._router.url.substring(0, this._router.url.length-11);
    
    this._location.back();
    
  }
}
