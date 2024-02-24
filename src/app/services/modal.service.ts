import { Component, ComponentRef, Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { Subject } from 'rxjs';
import { ModalComponent } from '../modal/modal.component';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _$formSubject: Subject<any> = new Subject<any>();
  $formSubject = this._$formSubject.asObservable();
  constructor(private _modalCtrl: ModalController) {}

  async openModal(component: any) {
    const modal = await this._modalCtrl.create({
      component: component,
      componentProps: {
        test: 1,
      },
    });
    modal.present();
    await modal.onDidDismiss().then((data) => this._$formSubject.next(data));
  }

  cancel() {
    return this._modalCtrl.dismiss(null, 'cancel');
  }
}
