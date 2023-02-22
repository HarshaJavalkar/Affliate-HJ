import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private data: DataService) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isAdminVerified = JSON.parse(sessionStorage.getItem('isAdminVerified'));
    if (!isAdminVerified) {
      return true;
    }
    // navigate to login page
    // this.router.navigate(['/modal']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
