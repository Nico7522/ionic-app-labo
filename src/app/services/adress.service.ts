import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AdressForm } from '../models/adress.model';
import { api } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdressService {
  constructor(private _httpClient: HttpClient) {}

  addAdress(adress: AdressForm, userId: number): Observable<boolean> {
    return this._httpClient.post<boolean>(
      `${api.url}/adress/addadress/${userId}`,
      adress
    );
  }
}
