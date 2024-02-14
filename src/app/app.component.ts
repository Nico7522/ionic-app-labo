import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTokenExist!: boolean;
  constructor(
    private _tokenService: TokenService,
    private _menu: MenuController
  ) {}
  ngOnInit(): void {
    this._tokenService.$isTokenExist.subscribe(
      (status) => (this.isTokenExist = status)
    );
  }

  closeMenu() {
    this._menu.close();
  }
}
