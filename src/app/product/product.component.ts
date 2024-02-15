import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Response } from '../models/response.model';
import { api } from '../../environments/environment';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(private _productService: ProductService) {}
  products: Product[] = [];
  imageUrl: string = api.imgUrl;
  ngOnInit() {
    this._productService.getAll().subscribe({
      next: (response: Response<Product[]>) => (this.products = response.data),
      error: (err) => console.log(err),
    });
  }

  
}
