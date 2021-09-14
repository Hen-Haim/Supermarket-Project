import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UserDetails } from '../models/UserDetails';
import { UserDetailsAfterLogin } from '../models/UserDetailsAfterLogin';

@Injectable({
  providedIn: 'root'
})

export class UsersService {
  registerCompletedDetails: UserDetails = new UserDetails();
  // userFirstName: string = "UnRegistered-Guest";
  // userDetails: UserDetails = new UserDetails();
  userDetailsAfterLogin:UserDetailsAfterLogin = new UserDetailsAfterLogin();


  cities: string[] = 
  ['New-York', 'London', 'Tel Aviv', 'Oxford', 'San Francisco', 'Liverpool', 'New Delhi', 'Amsterdam', 'Miami', 'Manchester'];

  constructor(private http: HttpClient) {
    // this.userDetails.city = this.cities[0];
  }

  registerPart01(partialUserDetails: UserDetails): Observable<string> {
    return this.http.post<string>("http://localhost:3001/users", partialUserDetails);
  }

  registerPart02(fullUserDetails: UserDetails): Observable<string> {
    console.log("register - im here")
    let response = this.http.post<string>("http://localhost:3001/users/register", fullUserDetails);
    console.log(response)
    return response
  }

  login(userDetails: UserDetails): Observable<UserDetailsAfterLogin> {
    console.log("login - im here")
    let response = this.http.post<UserDetailsAfterLogin>("http://localhost:3001/users/login", userDetails);
    console.log(response)
    return response
  }

  getUserDetailsForOrder(): Observable<UserDetails> {
    return this.http.get<UserDetails>("http://localhost:3001/users");
  }

  // selectCity(e: any): void {
  //   if(e.target.value === 'Choose...'){
  //     this.userDetails.city = undefined
  //   }else{
  //     this.userDetails.city = e.target.value;
  //   }
  // }
}
