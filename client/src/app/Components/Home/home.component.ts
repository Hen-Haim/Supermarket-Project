import { StateService } from 'src/app/services/state.service';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { NotifyService } from './../../services/notify.service';
import { UsersService } from './../../services/users.service';
import { PopularAndNew } from './../../models/ShoppingCartItem';
import { OrdersService } from './../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { faCopyright, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faArrowAltCircleRight } from '@fortawesome/free-regular-svg-icons';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  faUser = faUser;
  faInstagram = faInstagram;
  faFacebook = faFacebook;
  faLinkedIn = faLinkedin;
  faGithub = faGithub;
  faCopyright = faCopyright;
  faArrowCircleRight = faArrowAltCircleRight;

  public name:string;
  public usersCircle:number = 0;
  public productsCircle:number = 0;
  public ordersCircle:number = 0;
  public newItems: PopularAndNew[] = [];
  public popularItems: PopularAndNew [] = [];
  public firstButtonColor:string ="shopping-button-2";

  constructor( 
    public shoppingCartItemsService: ShoppingCartItemsService,
    private router: Router,
    private ordersService: OrdersService,
    public usersService: UsersService,
    private notifyService: NotifyService,
    public productsService:ProductsService,
    private stateService: StateService
    ) {  }

  ngOnInit() {
    if(this.shoppingCartItemsService.openCart === undefined){
      this.shoppingCartItemsService.openCart = [{id:0}];
    }
    this.waitForLogin();
  }

  waitForLogin() {
    while(this.shoppingCartItemsService.lastOrder !== undefined){
      return this.initialHomeFunction();
    }
    window.setTimeout(()=>{ this.waitForLogin() }, 220)
  }

  initialHomeFunction(){
    this.name = this.usersService.userDetailsAfterLogin.role === -1 ? "Guest" :this.usersService.userDetailsAfterLogin.userName;
    this.forHomeButtons();    
    this.countUsersOrdersAndProducts ();
    this.bringPopularAndNewProducts();
    this.arrangeCategories();
  }

  forHomeButtons(){
    if(this.usersService.userDetailsAfterLogin.role === -1){
      if(this.shoppingCartItemsService.openCart && this.shoppingCartItemsService.openCart[0]?.numOfItems === 0){
        this.shoppingCartItemsService.secondButtonForHome = "Shop Now"
      }else{
        this.shoppingCartItemsService.secondButtonForHome = "Continue Shopping";
      }
      return this.shoppingCartItemsService.firstButtonForHome = "Welcome!";
    }
    if(this.usersService.userDetailsAfterLogin.role === 0){
      if(this.shoppingCartItemsService.openCart && this.shoppingCartItemsService.openCart[0]?.numOfItems === 0){
        this.shoppingCartItemsService.lastOrder === null ? 
          this.shoppingCartItemsService.firstButtonForHome = "Welcome!" : 
          this.shoppingCartItemsService.firstButtonForHome = "Shop Again";
        return this.shoppingCartItemsService.secondButtonForHome = "Shop Now" ;       
      }else {
        this.shoppingCartItemsService.lastOrder === null ? 
          this.shoppingCartItemsService.firstButtonForHome = "Welcome!" : 
          this.shoppingCartItemsService.firstButtonForHome = `Last purchase: ${this.shoppingCartItemsService.lastOrder[0].orderingDate}`;
        return this.shoppingCartItemsService.secondButtonForHome = "Continue Shopping" 
      }      
    }

    this.shoppingCartItemsService.firstButtonForHome = "Welcome" ;
    return this.shoppingCartItemsService.secondButtonForHome = "Go To Products";
  }

  countUsersOrdersAndProducts () {
    this.ordersService.getUsersOrdersAndProductsAmounts().subscribe( amounts => {
      this.usersCircle = amounts[0].numOfUsers;
      this.productsCircle = amounts[0].numOfProducts;
      this.ordersCircle = amounts[0].numOfOrders;
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error);
    });  
  }

  bringPopularAndNewProducts () {
    this.shoppingCartItemsService.getPopularItems().subscribe( 
      popularAndNewItems => {
      this.popularItems = popularAndNewItems.slice(0, 3);
      this.newItems = popularAndNewItems.slice(Math.max(popularAndNewItems.length - 6, 0));
    },
      serverError => {
        this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error);
    });  
  }

  arrangeCategories() {
    this.productsService.getAllProducts().subscribe(
      allProducts => {
        this.productsService.products = allProducts;
        this.productsService.categories = [...new Set(this.productsService.products.map((data: Product) => data.nameCategory)),];
    },
      serverError => {
        this.stateService.errorMessage(serverError.status);
        this.notifyService.failedRequest(serverError.status , serverError.error.error)
    });
  }

  choosingAStatusForCart (event:Event){
    if((event.target as HTMLInputElement).name ==="Continue Shopping"){
      this.shoppingCartItemsService.newCartOrOldCart = "continue";
    }else if((event.target as HTMLInputElement).name ==="Shop Now"){
      this.shoppingCartItemsService.newCartOrOldCart = "new";
    }else if((event.target as HTMLInputElement).name ==="Shop Again"){
      this.shoppingCartItemsService.newCartOrOldCart = "last";
    }
    this.router.navigateByUrl("/products-and-forms/products");
  }

  isLogOut(){
    //login
    if(this.usersService.userDetailsAfterLogin.role ===-1){
      return this.router.navigateByUrl('/products-and-forms/forms/login')
    }
    //logout
      localStorage.removeItem("userDetailsAfterLogin");
      localStorage.removeItem("openCartId");
      this.shoppingCartItemsService.currentCartId = undefined;
      return window.location.reload();    
  }

  disable (){
    if(this.shoppingCartItemsService.firstButtonForHome === "Shop Again" || 
    this.shoppingCartItemsService.firstButtonForHome.includes('Last purchase')){
      this.firstButtonColor ="shopping-button-1";
      return false
    }
    this.firstButtonColor ="shopping-button-2";
    return true
  }
  
}
