import { Product } from 'src/app/models/Product';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { OrdersService } from './../../services/orders.service';
import { NotifyService } from './../../services/notify.service';
import { ProductsComponent } from './../ProductsAndForms/Products/products.component';
import { AppComponent } from './../../app.component';
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
    public appComponent:AppComponent,
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
    console.log('switching here?')
    if(this.stateService.modalStatus = "warning for product"){
      return this.removingTheProduct();
    }
    if(this.stateService.modalStatus = "ordering successfully"){
      return this.activateModalForSuccessOrder();
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
    console.log(this.stateService.productForModal)
    this.stateService.display = "none";
    console.log("here 0");
    if(this.stateService.productForModal.amount === 0){
      console.log('here 1')
      return this.activateModalForMessageProducts();
    }
    this.shoppingCartItemsService.currentCart.map( (product, i) => {
      if(product.idProduct === this.stateService.productForModal.idProduct){
        console.log('here 2')
        if(this.stateService.productForModal.amount === 0){
          console.log('here 3')
          return this.activateModalForMessageProducts();
        }
        console.log('here 4')
        return this.updatingTheCart(this.shoppingCartItemsService.currentCart[i].id);
      };
    })
    if(this.shoppingCartItemsService.currentCart.find( product => product.idProduct === this.stateService.productForModal.idProduct) ===undefined){
      console.log('here 5')
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
    () => { this.recreatingThePage()});  
  }

  async addingToCart(){
    console.log(this.stateService.productForModal);
    this.shoppingCartItemsService.addToCart(this.stateService.productForModal).subscribe( 
      () => { },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    async () => {
      console.log(this.stateService.productForModal);
      console.log(this.productsService.products)
      this.productsService.products.map( (product , i) => {
        if(product.idProduct === this.stateService.productForModal.idProduct){
          this.productsService.products[i].amount = this.stateService.productForModal.amount;
        };
      })
      this.stateService.productForModal.totalPrice = this.stateService.productForModal.amount * +this.stateService.productForModal.price;
      console.log(this.productsService.products);
      this.shoppingCartItemsService.currentCart[this.shoppingCartItemsService.currentCart.length] = this.stateService.productForModal;
      console.log(this.productsService.products);
      this.recreatingThePage();
    }); 
  }

  async removingTheProduct(){
    console.log("removing?2")
    this.stateService.display = "none";
    this.stateService.productForModal.amount = 0;
    console.log(this.stateService.productForModal.idProduct);
    this.shoppingCartItemsService.removeOneItem(this.stateService.productForModal.idProduct).subscribe( 
    () => { },
    serverError => {
      console.log("server error");
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    async ()=>{
      this.recreatingThePage();         
    }); 
  }

  async recreatingThePage(){
    console.log('here right??')
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
    try {
      let results = await this.http.post<ShoppingCartItem[] & Product[]>("http://localhost:3001/shopping-cart-items/open-cart", {shoppingCartId: `${this.shoppingCartItemsService.currentCartId}`}).toPromise();
        this.shoppingCartItemsService.openCart = results;
        console.log(this.shoppingCartItemsService.openCart);      
    } catch (error) {
      this.stateService.errorMessage(error.status);
      this.notifyService.failedRequest(error.status , error.error.error)
      console.log(this.shoppingCartItemsService.openCart)
    };  
  }

  async bringAllProducts() {
    try {
      let results =  await this.http.get<Product[]>("http://localhost:3001/products/special-get/" + this.shoppingCartItemsService.currentCartId).toPromise();  
        console.log(results);
        this.productsService.products = results;
        this.productsService.categories = [...new Set(this.productsService.products.map((data: Product) => data.nameCategory)),];
        for (let i = 0; i < this.productsService.categories.length; i++) {
          this.productsService.productsByCategories[i] =
            this.productsService.products.filter((filterProductsByCategory) => {
              return (
                filterProductsByCategory.nameCategory === this.productsService.categories[i]
              );
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
    () => {
      this.router.navigate(["/home"]);;
    }) 
  }

  activateModalForSuccessOrder(){
    this.stateService.modalStatus = "ordering successfully";
    this.stateService.headerForModal = "Ordering This Cart";
    this.stateService.mainContentForModal = "Your Order Has Been Submitted! You can now download your receipt";
    this.stateService.display = "block"; 
  }

  downloadReceipt(){
    let cart = this.shoppingCartItemsService.currentCart;
    let receiptArray = [];
    receiptArray.push('\n \n Your Receipt \n \n')
      for (var i = 0; i < cart.length; i++) {
      receiptArray.push('\n Name: ' + cart[i].name + '\n')
      receiptArray.push('\n Amount: ' + cart[i].amount + '\n')
      receiptArray.push('\n Price: ' + cart[i].totalPrice + '$' +'\n \n')
    };
    receiptArray.push('\n \n Total Price: '+ cart[0].finalPrice)
    const blob = new Blob(receiptArray, { type: 'application/json' });
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }
}
