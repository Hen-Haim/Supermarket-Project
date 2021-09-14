import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { UserDetailsAfterLogin } from '../models/UserDetailsAfterLogin';

@Injectable({
    providedIn: 'root'
  })
  
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let token: string | undefined;
        let userDetails:UserDetailsAfterLogin | undefined= JSON.parse(localStorage.getItem("userDetailsAfterLogin") || '{}');
        token = userDetails?.token;
        console.log("interceptor", token);

        if (token !== undefined) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        };
        return next.handle(request);
    }
}
