import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Response } from '../models/response.model';
import { api } from '../../environments/environment';
import { ModalService } from '../services/modal.service';
import { ModalfilterComponent } from '../modalfilter/modalfilter.component';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private _productService: ProductService, private _modalService: ModalService) {}
  products: Product[] = [];
  imageUrl: string = api.imgUrl;
  ngOnInit() {
    this._productService.getAll().subscribe({
      next: (response: Response<Product[]>) => (this.products = response.data),
      error: (err) => console.log(err),
    });
  }

  openFilter() {
    this._modalService.openModal(ModalfilterComponent);
  }

  
}
