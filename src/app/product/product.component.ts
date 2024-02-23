import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { Response } from '../models/response.model';
import { api } from '../../environments/environment';
import { ModalService } from '../services/modal.service';
import { ModalfilterComponent } from '../modalfilter/modalfilter.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  constructor(
    private _productService: ProductService,
    private _modalService: ModalService,
    private _router: Router
  ) {}
  offset: number = 0;
  products: Product[] = [];
  imageUrl: string = api.imgUrl;
  ngOnInit() {
    this._productService.getByStep(this.offset).subscribe({
      next: (response: Response<Product[]>) => (this.products = response.data),
      error: (err) => console.log(err),
    });
    
  }

  openFilter() {
    this._modalService.openModal(ModalfilterComponent);
  }

  addMoreProduct(): void {
    this.offset +=10;
    this._productService.getByStep(this.offset).subscribe({
      next: (response: Response<Product[]>) => {
        response.data.forEach(p => {
          this.products.push(p)
        })
      },
      error: (err) => console.log(err),
    });
  }
}
