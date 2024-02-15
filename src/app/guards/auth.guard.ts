import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { ModalComponent } from '../modal/modal.component';
import { ModalService } from '../services/modal.service';
import { TokenService } from '../services/token.service';

export const AuthGuard: CanActivateChildFn = (route, state) => {
  let modalService = inject(ModalService);
  let tokenService = inject(TokenService);
  if (!tokenService.isTokenExist) {
    modalService.openModal(ModalComponent);
    return false;
  }
  return true;
};
