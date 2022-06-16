import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class VerifyGuardService implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let status = JSON.parse(sessionStorage.getItem('isAdminVerified'));
    if (status) {
      return true;
    } else {
      this.router.navigateByUrl('modal');
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class VerifyGuardServiceChild implements CanActivateChild {
  constructor(private router: Router) {}

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let status = JSON.parse(sessionStorage.getItem('isAdminVerified'));

    if (status) {
      return true;
    } else {
      this.router.navigateByUrl('modal');
      return false;
    }
  }
}
