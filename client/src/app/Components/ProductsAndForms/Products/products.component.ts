import { NotifyService } from './../../../services/notify.service';
import { UsersService } from './../../../services/users.service';
import { StateService } from './../../../services/state.service';
import { ProductsService } from './../../../services/products.service';
import { Product } from './../../../models/Product';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { faAngleUp, faDollarSign, faEdit, faShoppingCart, faTimes, faTrash, faUser} 
from '@fortawesome/free-solid-svg-icons';
import * as CryptoJS from 'crypto-js';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';
import { ShoppingCartService } from 'src/app/services/shoppingCarts.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  // providers: [AppComponent ]
})
export class ProductsComponent implements OnInit {
  displayForCart = 'block';

  constructor(
    public productsService: ProductsService,
    public stateService: StateService,
    public shoppingCartItemsService: ShoppingCartItemsService,
    public shoppingCartService: ShoppingCartService,
    public usersService: UsersService,
    private notifyService: NotifyService,
    private detectChangesInProducts: ChangeDetectorRef
  ) {}


  ngAfterContentChecked() {
    this.productsService.products;
    this.productsService.productsByCategories;
    this.shoppingCartItemsService.currentCart;
    this.detectChangesInProducts.detectChanges();
  }

  ngOnInit(): void {
    console.log(this.shoppingCartItemsService.newCartOrOldCart);
    this.waitForLogin();
  }
  
  waitForLogin() {
    while(this.shoppingCartItemsService.lastOrder !== undefined){
      return this.initialFunction();
    }
    window.setTimeout(()=>{ this.waitForLogin() }, 220)
  }

  initialFunction(){
    if (this.shoppingCartItemsService.newCartOrOldCart === 'new') {
      return this.createNewShoppingCart('');

    } else if ( this.shoppingCartItemsService.newCartOrOldCart === 'continue' ) {
      this.shoppingCartItemsService.currentCart = this.shoppingCartItemsService.openCart;

    } else if (this.shoppingCartItemsService.newCartOrOldCart === 'last') {
      return this.createNewShoppingCart('last');

    } else if (this.shoppingCartItemsService.newCartOrOldCart === '') {
      if ( this.shoppingCartItemsService.openCart[0]?.numOfItems === 0 ) {
        console.log(this.shoppingCartItemsService.openCart);
        return this.createNewShoppingCart('');
      }
      console.log(this.shoppingCartItemsService.openCart);
      this.shoppingCartItemsService.currentCart = this.shoppingCartItemsService.openCart;
    } 
    return this.bringAllProducts();
  }

  createNewShoppingCart(isItLastCart: string) {
    console.log('did i get here?');
    // return this.bringAllProducts()
    this.shoppingCartService.addNewShoppingCart().subscribe(
      (cartId) => {
        console.log('here? thats no no');
        this.shoppingCartItemsService.currentCartId = cartId;
        let encryptedShoppingCartId = CryptoJS.AES.encrypt(`${this.shoppingCartItemsService.currentCartId}`,'User Secret Cart').toString();
        localStorage.setItem('openCartId', JSON.stringify(encryptedShoppingCartId));
      },
      (serverError) => { 
        this.stateService.errorMessage(serverError.status);
        this.notifyService.failedRequest(serverError.status , serverError.error.error)
      },
      () => {
        if (isItLastCart === 'last') {
          this.shoppingCartItemsService.currentCart = this.shoppingCartItemsService.lastOrder;
        }
        this.bringAllProducts();
      }
    );
  }


  bringAllProducts() {
    this.productsService.getAllProducts().subscribe(
      allProducts => {
        console.log(allProducts);
        this.productsService.products = allProducts;
        this.productsService.categories = [...new Set(this.productsService.products.map((data: Product) => data.nameCategory)),];
        for (let i = 0; i < this.productsService.categories.length; i++) {
          this.productsService.productsByCategories[i] =
            this.productsService.products.filter((filterProductsByCategory) => {
              return (
                filterProductsByCategory.nameCategory === this.productsService.categories[i]
              );
            });
        }
      },
      (serverError) => {
        this.stateService.errorMessage(serverError.status);
        this.notifyService.failedRequest(serverError.status , serverError.error.error);
      }
    );
  }

  toggleCart(){
    if(this.displayForCart === 'block'){
      return this.displayForCart = 'none';
    }
    return this.displayForCart = 'block';
  }
}
