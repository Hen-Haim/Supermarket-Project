import { Product } from 'src/app/models/Product';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from './../../services/orders.service';
import { NotifyService } from './../../services/notify.service';
import { ProductsComponent } from './../ProductsAndForms/Products/products.component';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';
import { Component, OnInit } from '@angular/core';
import { faPlus, faMinus, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { StateService } from 'src/app/services/state.service';
import { ProductsService } from 'src/app/services/products.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { ShoppingCartItem } from 'src/app/models/ShoppingCartItem';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  faPlus = faPlus;
  faMinus = faMinus;
  faExclamationCircle = faExclamationCircle;
  url: any = "";

  constructor(
    public stateService: StateService,
    public shoppingCartItemsService: ShoppingCartItemsService,
    public productsComponent: ProductsComponent,
    public productsService: ProductsService,
    private notifyService:NotifyService,
    public ordersService: OrdersService,
    private router: Router,
    private http:HttpClient,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {  }

  switchCasesForModal(){
    if(this.stateService.modalStatus === "warning for product"){
      return this.removingTheProduct();
    }
    if(this.stateService.modalStatus === "ordering successfully"){
      return this.activateModalForSuccessOrder();
    }
    if(this.stateService.modalStatus === "warning for all products"){
      return this.deleteAllItemsFromCart();
    }
    return this.submitOrder();
  }

  activateModalForMessageProducts(){
    this.stateService.modalStatus = "warning for product";
    this.stateService.headerForModal = "Deleting This Product";
    this.stateService.mainContentForModal = "Are You Sure You Want To Delete This Product?";
    this.stateService.display = "block"; 
  }

  saveChangesInModal(){
    this.stateService.display = "none";
    if(this.stateService.productForModal.amount === 0){
      return this.activateModalForMessageProducts();
    }
    this.shoppingCartItemsService.currentCart.map( (product, i) => {
      if(product.idProduct === this.stateService.productForModal.idProduct){
        if(this.stateService.productForModal.amount === 0){
          return this.activateModalForMessageProducts();
        }
        return this.updatingTheCart(this.shoppingCartItemsService.currentCart[i].id);
      };
    })
    if(this.shoppingCartItemsService.currentCart.find( product => product.idProduct === this.stateService.productForModal.idProduct) ===undefined){
      return this.addingToCart()
    }    
  }

  updatingTheCart (num:number) {
    let product = this.stateService.productForModal;
    product.id = num;
    this.shoppingCartItemsService.updateOneCart(product).subscribe( 
    () => { },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () =>  this.recreatingThePage());  
  }

  async addingToCart(){
    this.shoppingCartItemsService.addToCart(this.stateService.productForModal).subscribe( 
      () => { },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    async () => {
      this.productsService.products.map( (product , i) => {
        if(product.idProduct === this.stateService.productForModal.idProduct){
          this.productsService.products[i].amount = this.stateService.productForModal.amount;
        };
      })
      this.stateService.productForModal.totalPrice = this.stateService.productForModal.amount * +this.stateService.productForModal.price;
      this.shoppingCartItemsService.currentCart[this.shoppingCartItemsService.currentCart.length] = this.stateService.productForModal;
      this.recreatingThePage();
    }); 
  }

  async removingTheProduct(){
    this.stateService.display = "none";
    this.stateService.productForModal.amount = 0;
    this.shoppingCartItemsService.removeOneItem(this.stateService.productForModal.idProduct).subscribe( 
    () => { },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    async ()=> this.recreatingThePage()); 
  }

  async recreatingThePage(){
    await this.bringOpenCart();
    await this.bringAllProducts();
    this.shoppingCartItemsService.currentCart = this.shoppingCartItemsService.openCart;
  }

  addingUnits() {
    this.stateService.productForModal.amount += 1; 
  }

  removingUnits() {
    if(this.stateService.productForModal.amount  !== 0){
      this.stateService.productForModal.amount -= 1;       
    }
  }

  async bringOpenCart() {
    let url = "http://localhost:3001/shopping-cart-items/open-cart/";
    try {
      let results = await this.http.get<ShoppingCartItem[] & Product[]>(url + this.shoppingCartItemsService.currentCartId).toPromise();
        this.shoppingCartItemsService.openCart = results;
    } catch (error) {
      this.stateService.errorMessage(error.status);
      this.notifyService.failedRequest(error.status , error.error.error)
    };  
  }

  async bringAllProducts() {
    let url = "http://localhost:3001/products/special-get/";
    try {
      let results =  await this.http.get<Product[]>(url + this.shoppingCartItemsService.currentCartId).toPromise();  
        this.productsService.products = results;
        this.productsService.categories = [...new Set(this.productsService.products.map((data: Product) => data.nameCategory)),];
        for (let i = 0; i < this.productsService.categories.length; i++) {
          this.productsService.productsByCategories[i] =
            this.productsService.products.filter((filterProductsByCategory) => {
              return ( filterProductsByCategory.nameCategory === this.productsService.categories[i] );
            });
        }      
    } catch (error) {
      this.stateService.errorMessage(error.status);
      this.notifyService.failedRequest(error.status , error.error.error);
    }
  }

  submitOrder(){
    let encryptedShoppingCartId = JSON.parse(localStorage.getItem("openCartId") || '{}');
    this.ordersService.orderDetails.idShoppingCart = +CryptoJS.AES.decrypt(encryptedShoppingCartId, "User Secret Cart").toString(CryptoJS.enc.Utf8)
    this.ordersService.addOrder(this.ordersService.orderDetails).subscribe( orderResult => {
    this.notifyService.successfulRequest(orderResult);
    },
    serverError => {
    this.stateService.errorMessage(serverError.status);
    this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () => this.activateModalForSuccessOrder()
    ) 
  }

  activateModalForSuccessOrder(){
    this.stateService.modalStatus = "ordering successfully";
    this.stateService.headerForModal = "Ordering This Cart";
    this.stateService.mainContentForModal = "Your Order Has Been Submitted! You can now download your receipt";
    this.stateService.display = "block"; 
  }

  downloadReceipt(){
    this.stateService.display = "none";
    let cart = this.shoppingCartItemsService.currentCart;
    let receiptArray = [];
    receiptArray.push('\n \n Your Receipt \n \n')
      for (var i = 0; i < cart.length; i++) {
      receiptArray.push('\n Name: ' + cart[i].name + '\n\n Amount: ' + cart[i].amount + '\n\n Price: ' + cart[i].totalPrice + '$' +'\n\n')
    };
    receiptArray.push('\n \n Total Price: '+ cart[0].finalPrice)
    const blob = new Blob(receiptArray, { type: 'application/json' });
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
    this.router.navigate(["/home"]);
  }

  deleteAllItemsFromCart() {
    this.stateService.display = "none";
    this.shoppingCartItemsService.deleteAllItemsOnCart().subscribe(
      message =>  this.notifyService.successfulRequest(message),
      serverError => {
        this.stateService.errorMessage(serverError.status);
        this.notifyService.failedRequest(serverError.status , serverError.error.error);
      },
      () => {
        this.recreatingThePage();
        this.shoppingCartItemsService.currentCart = [];
      }
    );
  }
  closeSuccessOrder(){
    this.stateService.display = 'none';
    this.router.navigate(["/home"])    
  }

}