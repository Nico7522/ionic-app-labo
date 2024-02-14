import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../environments/environment';
import { Login, Token } from '../models/login.model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _httpClient: HttpClient) {}

  login(loginForm: Login): Observable<Token> {
    return this._httpClient.post<Token>(`${api.url}/auth/login`, loginForm);
  }
}
