

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { WebStorageService } from '../services/web-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardAdmin implements CanActivate {

  constructor(private storage: WebStorageService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    let userObj = this.storage.getUser();
    // console.log("userObj", userObj);
    // const isAdmin = userObj.role.includes('Admin')
    if (this.storage.getCookie() && userObj &&  userObj.role.includes('Admin')) {
      return true
    } else {
      this.router.navigate(['/auth/login']);
      return false;
    }
  }
}
