import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserInfos } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private _router: Router) {}

  get isTokenExist(): boolean {
    return localStorage.getItem('token') != undefined;
  }
  private _$isTokenExist: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.isTokenExist);
  $isTokenExist = this._$isTokenExist.asObservable();

  emitTokenExist() {
    this._$isTokenExist.next(this.isTokenExist);
    if(this.isTokenExist === false && this._router.url.includes("profile")) {
      this._router.navigate(['/']);
    }
  }

  readToken(): UserInfos  {
    let token: string = localStorage.getItem('token') ?? '';
    let jwt: any
    if(token !== "") {
      jwt  = jwt_decode.jwtDecode(token);
    }
    
    return {
      id: jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'],
      fullName:
        jwt['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'],
      role: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'],
      tokenLimitDate: jwt['http://schemas.microsoft.com/ws/2008/06/identity/claims/expiration']
    };
  }
}
