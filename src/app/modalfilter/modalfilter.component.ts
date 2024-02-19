import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Filter } from '../models/filter.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-modalfilter',
  templateUrl: './modalfilter.component.html',
  styleUrls: ['./modalfilter.component.scss'],
})
export class ModalfilterComponent implements OnInit {
  // name: string = '';
  // private _filter: Filter = {
  //   modelName: '',
  //   categorie: '',
  //   sexe: '',
  //   brand: '',
  // };
  filterForm!: FormGroup;
  constructor(
    private _modalCtrl: ModalController,
    private _modalService: ModalService,

    private _formBuilder: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this._modalService.$formSubject.subscribe({
      next: (res) => {
        let form = res.data as FormGroup;
      },
    });

    this.filterForm = this._formBuilder.group({
      modelName: [''],
      category: [''],
      sexe: [''],
      brand: [''],
    });
  }

  cancel() {
    return this._modalCtrl.dismiss(this.filterForm, 'cancel');
  }

  handleSubmit() {
    const filter: Filter = {
      modelName: this.filterForm.get('modelName')?.value,
      categorie: this.filterForm.get('category')?.value,
      sexe: this.filterForm.get('sexe')?.value,
      brand: this.filterForm.get('brand')?.value,
    };
    this._router.navigate(['/product/search'], { queryParams: filter });
    this.cancel();
  }
}
