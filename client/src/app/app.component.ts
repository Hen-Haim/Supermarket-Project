import { StateService } from 'src/app/services/state.service';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from './services/notify.service';
import { UsersService } from './services/users.service';
import { Component, OnInit } from '@angular/core';
import { UserDetailsAfterLogin } from './models/UserDetailsAfterLogin';
import { ShoppingCartItemsService } from './services/shoppingCartItems.service';
import * as CryptoJS from 'crypto-js';
import { ProductsComponent } from './Components/ProductsAndForms/Products/products.component';
import { HomeComponent } from './Components/Home/home.component';
import { UserDetails } from './models/UserDetails';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ProductsComponent, HomeComponent ]
})
export class AppComponent implements OnInit {
  url:string = "http://localhost:3001/users/login";

  constructor(
    public usersService:UsersService,
    public shoppingCartItemsService: ShoppingCartItemsService,
    public notifyService:NotifyService,
    private http: HttpClient,
    private stateService:StateService
    ) { };

  ngOnInit(): void {
    if(this.shoppingCartItemsService.openCart === undefined){
      this.shoppingCartItemsService.openCart = [{id:0}];
    }
    this.usersService.userDetailsAfterLogin = JSON.parse(localStorage.getItem("userDetailsAfterLogin") || '{}');
    let encryptedShoppingCartId = JSON.parse(localStorage.getItem("openCartId") || '{}');

    if(Object.keys(encryptedShoppingCartId).length !== 0){
      this.shoppingCartItemsService.currentCartId = CryptoJS.AES.decrypt(encryptedShoppingCartId, "User Secret Cart").toString(CryptoJS.enc.Utf8);
    }
    // if role is unregistered-user and does not have a cart
    if(this.usersService.userDetailsAfterLogin.role === -1 && this.shoppingCartItemsService.currentCartId === undefined){
          this.shoppingCartItemsService.openCart[0].numOfItems = 0;
          this.shoppingCartItemsService.lastOrder = null;
      return
    } 
    //if not logged in
    if(typeof this.usersService.userDetailsAfterLogin?.userName !== "string"){
      let unregisteredUserDetails = {password:999999, userName: "unregister-user@not.exist"};
      this.login(unregisteredUserDetails);  

    } else{
    // if role is admin
      if(this.usersService.userDetailsAfterLogin?.role === 1){
        this.shoppingCartItemsService.openCart[0].numOfItems = 0;
        this.shoppingCartItemsService.lastOrder = null;
        return
      }
      this.bringOpenCartItemsIfExist();
    }
  }

  // make a forced login
  public async login(userDetails: UserDetails) {
    try {
      const loggedInUser = await this.http.post<UserDetailsAfterLogin>(this.url, userDetails).toPromise();
      this.usersService.userDetailsAfterLogin = loggedInUser;
      localStorage.setItem("userDetailsAfterLogin", JSON.stringify(loggedInUser));

      if(this.shoppingCartItemsService.currentCartId === undefined && this.usersService.userDetailsAfterLogin.role ===-1){
        this.shoppingCartItemsService.lastOrder = null;
        this.shoppingCartItemsService.openCart[0].numOfItems = 0;
        return 
      }     
      this.bringOpenCartItemsIfExist();
    } catch (error) {
      this.stateService.errorMessage(error.status);
      this.notifyService.failedRequest(error.status , error.error.error)
    }
  } 
  
  //bring all items of open cart if exists
  bringOpenCartItemsIfExist () {
    this.shoppingCartItemsService.getOpenCartItems().subscribe( openCartItemsIfExist => {
      this.shoppingCartItemsService.openCart = openCartItemsIfExist;
      if(this.shoppingCartItemsService.openCart[0]?.numOfItems !== 0){
        this.shoppingCartItemsService.currentCartId = this.shoppingCartItemsService.openCart[0].idShoppingCart;
        let encryptedShoppingCartId = CryptoJS.AES.encrypt(`${this.shoppingCartItemsService.currentCartId}`, "User Secret Cart").toString();
        localStorage.setItem("openCartId", JSON.stringify(encryptedShoppingCartId));
      }
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () => {
      if(this.shoppingCartItemsService.currentCartId === undefined && this.usersService.userDetailsAfterLogin.role === -1){
        this.shoppingCartItemsService.lastOrder = null;
        this.shoppingCartItemsService.openCart[0].numOfItems = 0;
        return  ;
      } 
      this.bringPastOrderIfExists();
    });  
  }

  //bring all items of the last order if exists
  bringPastOrderIfExists () {
    this.shoppingCartItemsService.getPastOrders().subscribe( lastCartItemsIfExist => {
      this.shoppingCartItemsService.lastOrder = lastCartItemsIfExist;
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    });  
  }  

}