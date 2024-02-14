import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  isOpen!: boolean;
  constructor(private _modalService: ModalService) {}

  ngOnInit() {
    this._modalService.$isOpen.subscribe((status) => (this.isOpen = status));
  }

  closeModal() {
    this._modalService.toggleModal(false);
    this.isOpen = false;
  }
}
