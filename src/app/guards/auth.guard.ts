import { inject } from '@angular/core';
import { CanActivateChildFn } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { TokenService } from '../services/token.service';

export const AuthGuard: CanActivateChildFn = (route, state) => {
  let modalService = inject(ModalService);
  let tokenService = inject(TokenService);
  if (!tokenService.isTokenExist) {
    modalService.toggleModal(true);
    return false;
  }
  return true;
};
