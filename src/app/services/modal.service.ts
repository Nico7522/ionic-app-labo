import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private _$isOpen: Subject<boolean> = new Subject<boolean>();
  $isOpen = this._$isOpen.asObservable();

  constructor() {}

  toggleModal(value: boolean) {
    this._$isOpen.next(value);
  }
}
