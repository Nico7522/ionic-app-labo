import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { api } from '../../environments/environment';
import { Login, Register, Token } from '../models/login.model';
import { Observable, map, of } from 'rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private _httpClient: HttpClient,
    private _tokenService: TokenService
  ) {}

  login(loginForm: Login): Observable<Token> {
    return this._httpClient
      .post<Token>(`${api.url}/auth/login`, loginForm)
      .pipe(
        map((response) => {
          console.log('response service', response);
          localStorage.setItem('token', response.token);
          this._tokenService.emitTokenExist();
          return response;
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this._tokenService.emitTokenExist();
  }

  register(registerForm: Register): Observable<Token> {
    return this._httpClient
      .post<Token>(`${api.url}/auth/register`, registerForm)
      .pipe(
        map((response) => {
          localStorage.setItem('token', response.token);
          this._tokenService.emitTokenExist();
          return response;
        })
      );
  }
}
