import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isOpen!: boolean;
  constructor(private _modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this._modalCtrl.dismiss(null, 'cancel');
  }
}
