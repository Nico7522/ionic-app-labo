import { Component, OnInit } from '@angular/core';
import { TokenService } from './services/token.service';
import { MenuController, ModalController } from '@ionic/angular';
import { ModalService } from './services/modal.service';
import { ModalComponent } from './modal/modal.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  isTokenExist!: boolean;
  isOpen!: boolean;
  constructor(
    private _tokenService: TokenService,
    private _menu: MenuController,
    private _modalService: ModalService,
    private _modalCtrl: ModalController
  ) {}
  ngOnInit(): void {
    this._tokenService.$isTokenExist.subscribe(
      (status) => (this.isTokenExist = status)
    );

  }

  closeMenu() {
    this._menu.close();
  }

  cancel() {
    return this._modalCtrl.dismiss(null, 'cancel');
  }

}
