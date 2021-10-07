import { NotifyService } from './../../services/notify.service';
import { UserDetailsAfterLogin } from './../../models/UserDetailsAfterLogin';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {
  public constructor(
    private router: Router,
    private notify: NotifyService
    ) { }

  public canActivate(): boolean {
    let userDetailsAfterLogin:UserDetailsAfterLogin;
    userDetailsAfterLogin = JSON.parse(localStorage.getItem("userDetailsAfterLogin") || '{}');

    if (userDetailsAfterLogin.role === 1) {
      this.notify.failedRequest(605, "You are not authorize to view or do this current action!")
      this.router.navigateByUrl("/home");      
      return false;
    }
    return true;
  }
}
