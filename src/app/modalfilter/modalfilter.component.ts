import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modalfilter',
  templateUrl: './modalfilter.component.html',
  styleUrls: ['./modalfilter.component.scss'],
})
export class ModalfilterComponent  implements OnInit {

  constructor(private _modalCtrl: ModalController) {}

  ngOnInit() {}

  cancel() {
    return this._modalCtrl.dismiss(null, 'cancel');
  }



  compareWith(o1: any, o2: any) {
    return o1.id === o2.id;
  }

  handleChange(ev: any) {
    console.log((ev.target.value));
  }

  trackItems(index: number, item: any) {
    return item.id;
  }

}
