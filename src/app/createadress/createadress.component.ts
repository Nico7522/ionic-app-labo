import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Adress, AdressForm } from '../models/adress.model';
import { TokenService } from '../services/token.service';
import { UserInfos } from '../models/user.model';
import { AdressService } from '../services/adress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createadress',
  templateUrl: './createadress.component.html',
  styleUrls: ['./createadress.component.scss'],
})
export class CreateadressComponent implements OnInit {
  userId!: number;
  adressForm!: FormGroup;
  message!: string;
  constructor(
    private _formBuilder: FormBuilder,
    private _tokenService: TokenService,
    private _adressService: AdressService,
    private _router: Router
  ) {}

  ngOnInit() {
    const user: UserInfos = this._tokenService.readToken();
    this.userId = user.id;
    this.adressForm = this._formBuilder.group({
      cityName: ['', [Validators.required]],
      country: ['', [Validators.required]],
      number: ['', [Validators.required]],
      street: ['', [Validators.required]],
    });
  }

  handleSubmit() {
    if (this.adressForm.valid) {
      const adress: AdressForm = {
        cityName: this.adressForm.get('cityName')?.value,
        country: this.adressForm.get('country')?.value,
        number: this.adressForm.get('number')?.value,
        street: this.adressForm.get('street')?.value,
      };
      this._adressService.addAdress(adress, this.userId).subscribe({
        next: () => {
          this.adressForm.reset();
          this._router.navigate(['/profile']);
        },

        error: (err) => {
          this.message = 'Une erreur est survenue';
        },
      });
    }
  }
}
