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
import { ProductsService } from './services/products.service';
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
    public productsService: ProductsService,
    public notifyService:NotifyService,
    private http: HttpClient,
    private stateService:StateService
    ) { };

  ngOnInit(): void {
    this.usersService.userDetailsAfterLogin = JSON.parse(localStorage.getItem("userDetailsAfterLogin") || '{}');
    let encryptedShoppingCartId = JSON.parse(localStorage.getItem("openCartId") || '{}');
    console.log(encryptedShoppingCartId);
    console.log(CryptoJS.AES.decrypt(encryptedShoppingCartId, "User Secret Cart").toString(CryptoJS.enc.Utf8));

    if(Object.keys(encryptedShoppingCartId).length !== 0){
      this.shoppingCartItemsService.currentCartId = CryptoJS.AES.decrypt(encryptedShoppingCartId, "User Secret Cart").toString(CryptoJS.enc.Utf8);
    }
    // if role is not registered-user and does not have a cart OR is admin
    if((this.usersService.userDetailsAfterLogin.role === -1 && this.shoppingCartItemsService.currentCartId === undefined)
        || (this.usersService.userDetailsAfterLogin.role === 1) ){
      return
    } 
    //if not logged in
    if(typeof this.usersService.userDetailsAfterLogin?.userName !== "string"){
      let unregisteredUserDetails = {password:999999, userName: "unregister-user@not.exist"};
      this.login(unregisteredUserDetails);  

    } else{
      if(this.usersService.userDetailsAfterLogin?.role ===1){
        return
      }
      this.bringOpenCartItemsIfExist();
    }
  }

  public async login(userDetails: UserDetails) {
    try {
      const loggedInUser = await this.http.post<UserDetailsAfterLogin>(this.url, userDetails).toPromise();
      this.usersService.userDetailsAfterLogin = loggedInUser;
      localStorage.setItem("userDetailsAfterLogin", JSON.stringify(loggedInUser));

      console.log(this.shoppingCartItemsService.currentCartId);
      if(this.shoppingCartItemsService.currentCartId === undefined && this.usersService.userDetailsAfterLogin.role ===-1){
        this.shoppingCartItemsService.lastOrder = null;
        this.shoppingCartItemsService.openCart[0].numOfItems === 0;
        return  ;
      }     
      this.bringOpenCartItemsIfExist();
    } catch (error) {
      this.stateService.errorMessage(error.status);
      this.notifyService.failedRequest(error.status , error.error.error)
    }
  } 
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
      if( this.usersService.userDetailsAfterLogin.role === -1){
        console.log("suppose to go here 2");
        this.shoppingCartItemsService.lastOrder = null;
        this.shoppingCartItemsService.openCart[0].numOfItems === 0;
        return  ;
      } 
      this.bringPastOrderIfExists();
    });  
  }

  bringPastOrderIfExists () {
    console.log(this.shoppingCartItemsService.openCart)
    this.shoppingCartItemsService.getPastOrders().subscribe( lastCartItemsIfExist => {
      this.shoppingCartItemsService.lastOrder = lastCartItemsIfExist;
      console.log(this.shoppingCartItemsService.lastOrder)
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    });  
  }  

}


    // var encrypted = CryptoJS.AES.encrypt("13", "User Secret Cart");
    // //U2FsdGVkX18ZUVvShFSES21qHsQEqZXMxQ9zgHy+bu0=
    // console.log(encrypted.toString())
    
    // var decrypted = CryptoJS.AES.decrypt(encrypted, "User Secret Cart").toString(CryptoJS.enc.Utf8);
    // //4d657373616765
    // console.log(decrypted);
    // // console.log(decrypted.toString(CryptoJS.enc.Utf8));

      // this.usersService.login(unregisteredUserDetails).subscribe( resultUserDetailsAfterLogin => {
      //   this.usersService.userDetailsAfterLogin = resultUserDetailsAfterLogin;
      //   localStorage.setItem("userDetailsAfterLogin", JSON.stringify(resultUserDetailsAfterLogin));
      // },
      // serverError => {
      //  this.stateService.errorMessage(serverError.status);
      //   this.notifyService.failedRequest(serverError.status , serverError.error.error)
      // },
      // () => {
      //   console.log(this.shoppingCartItemsService.currentCartId);
      //   if(this.shoppingCartItemsService.currentCartId === undefined && this.usersService.userDetailsAfterLogin.role ===-1){
      //     console.log("suppose to go here");
      //     return this.shoppingCartItemsService.bringPastOrderIfExists() ;
      //   }
      //   this.shoppingCartItemsService.bringOpenCartItemsIfExist();
      // }) ; 
