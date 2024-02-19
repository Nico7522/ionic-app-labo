import { Component, OnInit } from '@angular/core';
import { AvailableSizes, Product } from '../models/product.model';
import { api } from '../../environments/environment';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { SizeselectmodalComponent } from '../sizeselectmodal/sizeselectmodal.component';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.scss'],
})
export class ProductdetailsComponent implements OnInit {
  productId!: number;
  product!: Product;
  imageUrl: string = api.imgUrl;
  constructor(
    private _productService: ProductService,
    private _activatedRoute: ActivatedRoute,
    private _modalService: ModalService
  ) {}

  ngOnInit() {
    this.productId = this._activatedRoute.snapshot.params['id'];
    this._productService.getById(this.productId).subscribe({
      next: (product) => {
        console.log(product);
        this.product = product.data;
      },
    });
  }

  openModal() {
    this._modalService.openModal(SizeselectmodalComponent);
  }

  compareWith(o1: AvailableSizes, o2: AvailableSizes) {
    return o1.sizeId === o2.sizeId;
  }

  handleChange(ev: any) {
    console.log('Current value:', JSON.stringify(ev.target.value));
  }

  trackItems(index: number, item: AvailableSizes) {
    return item.sizeId;
  }
}
