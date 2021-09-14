import { StateService } from 'src/app/services/state.service';
import { NotifyService } from './../../../../services/notify.service';
import { ShoppingCartService } from './../../../../services/shoppingCarts.service';
import { ShoppingCartItemsService } from './../../../../services/shoppingCartItems.service';
import { UsersService } from './../../../../services/users.service';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { UserDetails } from 'src/app/models/UserDetails';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  userDetailsForLogin:UserDetails = new UserDetails();
  changeOfColor:boolean = false;

  constructor(
    public usersService: UsersService, 
    private router: Router,
    public shoppingCartItemsService: ShoppingCartItemsService,
    public shoppingCartService: ShoppingCartService,
    private notifyService: NotifyService,
    private stateService: StateService
  ) { }

  ngOnInit(): void {
  }

  login(): void{
    this.usersService.login(this.userDetailsForLogin).subscribe( resultUserDetailsAfterLogin => {
      this.usersService.userDetailsAfterLogin = resultUserDetailsAfterLogin;
      localStorage.setItem("userDetailsAfterLogin", JSON.stringify(resultUserDetailsAfterLogin));
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () => {
      this.checkAfterLogin();
    });
  }

  checkAfterLogin(): void{
    let encryptedShoppingCartId = JSON.parse(localStorage.getItem("openCartId") || '{}');
    // console.log(encryptedShoppingCartId);
    // console.log(CryptoJS.AES.decrypt(encryptedShoppingCartId, "User Secret Cart").toString(CryptoJS.enc.Utf8));
    if(this.usersService.userDetailsAfterLogin.role === 1){
      this.router.navigate(["/products-and-forms/products/main"]);
    }
    if(Object.keys(encryptedShoppingCartId).length !== 0 && this.usersService.userDetailsAfterLogin.role !== 1){
      this.changingUserIdForCart()
    }
  }

  changingUserIdForCart(){
    this.shoppingCartService.changeUserIdForShoppingCart(this.shoppingCartItemsService.currentCartId).subscribe( 
    () => {  },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () => {
      this.router.navigate(["/home"]);
    });    
  }

}
