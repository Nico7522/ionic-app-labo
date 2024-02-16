import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Filter } from '../models/filter.model';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { api } from '../../environments/environment';
import { Observable, Subject, Subscription, of } from 'rxjs';
import { Response } from '../models/response.model';
import { ModalService } from '../services/modal.service';
import { ModalfilterComponent } from '../modalfilter/modalfilter.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  imageUrl: string = api.imgUrl;
  products: Product[] = [];
  productSub!: Subscription;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _modalService: ModalService
  ) {}
  ngOnDestroy(): void {
    this.productSub.unsubscribe();
  }

  openFilter() {
    this._modalService.openModal(ModalfilterComponent);
  }
  ngOnInit() {
    let filter: Filter = {
      modelName: '',
      sexe: '',
      categorie: '',
      brand: '',
    };

    this._activatedRoute.queryParams.subscribe({
      next: (data) => {
        filter.modelName = data['modelName'];
        filter.sexe = data['sexe'];
        filter.categorie = data['categorie'];
        filter.brand = data['brand'];
        this.productSub = this._productService.filter(filter).subscribe({
          next: (res) => {
            this.products = res.data;
          },
        });
      },
    });
  }
}
