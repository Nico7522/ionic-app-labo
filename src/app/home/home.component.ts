import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../models/product.model';
import { Response } from '../models/response.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  topProduct: Product[] = [];
  constructor(private _productService: ProductService, private _router: Router) { }

  ngOnInit() {
    this._productService.getTopProduct().subscribe({
      next: (response) => this.topProduct = response.data,
      error: (err) => console.log(err)
      

      
    })

    this._productService.setCurrentLocation(this._router.url);
  }

}
