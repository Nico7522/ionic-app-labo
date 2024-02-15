import { Component, ComponentRef, Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private _modalCtrl: ModalController) {}

  async openModal(component: any) {
    const modal = await this._modalCtrl.create({
      component: component,
    });
    modal.present();
    await modal.onDidDismiss();

  }
}
