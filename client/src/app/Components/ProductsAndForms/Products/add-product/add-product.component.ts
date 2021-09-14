import { StateService } from 'src/app/services/state.service';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from './../../../../services/notify.service';
import { Product } from 'src/app/models/Product';
import { ProductsService } from './../../../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { faUser, faLock, faArchive, faCarrot, faDollarSign, faImage } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';
import { ShoppingCartService } from 'src/app/services/shoppingCarts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  faUser = faUser;
  faLock = faLock;
  faArchive = faArchive;
  faCarrot= faCarrot;
  faDollarSign = faDollarSign;
  faImage = faImage;

  newProductDetails:Product = new Product();

  constructor(
    public usersService: UsersService, 
    public shoppingCartItemsService: ShoppingCartItemsService,
    public shoppingCartService: ShoppingCartService,
    public productsService: ProductsService,
    private notifyService: NotifyService,
    private http: HttpClient,
    private stateService:StateService
  ) { }

  ngOnInit(): void {
  }

  onChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement
    this.productsService.productDetails.nameCategory = thisOptionValue.value;
    if(thisOptionValue.value !== ""){
      console.log(thisOptionValue.value)
    }
    // this.inputForCategoryName.value = this.productsService.productDetails.nameCategory;
    // console.log(this.inputForCategoryName);
  }

  onInputChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement;
    this.productsService.productDetails.nameCategory = thisOptionValue.value;
    if(thisOptionValue.value === "" || thisOptionValue.value === null){
      this.productsService.productDetails.nameCategory = undefined;
      console.log(this.productsService.productDetails.nameCategory)
    }
    console.log(thisOptionValue.value)
  }

  addingNewProduct(){
    console.log(this.productsService.productDetails.nameCategory)
    console.log(this.newProductDetails);
    this.productsService.productDetails = this.newProductDetails;
    this.productsService.products.push(this.newProductDetails);
    this.productsService.addProduct().subscribe( lastCartItemsIfExist => {
    this.notifyService.successfulRequest(lastCartItemsIfExist)
    },
    serverError => {
    this.stateService.errorMessage(serverError.status);
    this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    ()=>{
      this.bringAllProducts();
    }) ;
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

}
