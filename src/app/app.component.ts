import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './modal/modal.component';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { Observable } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTokenExist!: boolean;
  isOpen!: boolean;
  // $cartLength = this._cartService.$cart_length;
  cartLength!: number;
  constructor(
    private _tokenService: TokenService,
    private _menu: MenuController,
    private _modalService: ModalService,
    private _modalCtrl: ModalController,
    private _authService: AuthService,
    private _cartService: CartService,
    private _userService: UserService
  ) {}
  ngOnInit(): void {
    this._tokenService.$isTokenExist.subscribe(
      (status) => (this.isTokenExist = status)
    );

    this._cartService.$cart_length.subscribe((l) => (this.cartLength = l));
  }

  closeMenu() {
    this._menu.close();
  }

  cancel() {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

  logout() {
    this._authService.logout();
  }

  setLocation(location: string) {
    this._userService.setCurrentLocation(location);

  }
}
