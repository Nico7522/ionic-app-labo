import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { api } from '../../../environments/environment';

@Component({
  selector: 'app-product-standalone',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent  implements OnInit {

  imageUrl: string = api.imgUrl;

  @Input() product!: Product 
  constructor() { }

  ngOnInit() {}

}
