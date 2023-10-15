import {ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {LocalStorageService} from "../services/local-storage.service";

export const AuthGuard : CanActivateFn = (
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot) => {
  console.log(inject(LocalStorageService).getItem('token'))
  if (inject(LocalStorageService).getItem('token') == null) {
    inject(AuthService).logout()
  }
  return true;
};
