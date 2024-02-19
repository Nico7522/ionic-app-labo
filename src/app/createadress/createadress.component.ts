import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-createadress',
  templateUrl: './createadress.component.html',
  styleUrls: ['./createadress.component.scss'],
})
export class CreateadressComponent implements OnInit {
  adressForm!: FormGroup;
  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.adressForm = this._formBuilder.group({
      cityName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      number: ['', [Validators.required]],
      street: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.adressForm.valid) {
    }
  }
}
