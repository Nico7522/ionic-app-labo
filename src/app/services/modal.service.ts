import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private _modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this._modalCtrl.create({
      component: ModalComponent,
    });
    modal.present();
    await modal.onDidDismiss();

  }
}
