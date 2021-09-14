import { UserDetailsAfterLogin } from './../../models/UserDetailsAfterLogin';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  public constructor(private router: Router) { }

  public canActivate(): boolean {
    let registerPartOneWereASuccess: UserDetailsAfterLogin;
    registerPartOneWereASuccess = JSON.parse(localStorage.getItem("isRegisterFirstPart") || '{}');

    if (registerPartOneWereASuccess === undefined || Object.keys(registerPartOneWereASuccess).length === 0) {
      this.router.navigateByUrl("/products-and-forms/forms/register-part-one");      
      return false;
    }
    return true;
  }
  
}
