import { NotifyService } from './../../../../services/notify.service';
import { StateService } from 'src/app/services/state.service';
import { Component, OnInit } from '@angular/core';
import { faUser, faLock, faArchive, faCarrot, faDollarSign, faImage, faPlusSquare } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product';
import { ProductsService } from 'src/app/services/products.service';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';
import { ShoppingCartService } from 'src/app/services/shoppingCarts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  faUser = faUser;
  faLock = faLock;
  faArchive = faArchive;
  faCarrot= faCarrot;
  faDollarSign = faDollarSign;
  faImage = faImage;
  faPlusSquare = faPlusSquare;

  updateProductDetails:Product = new Product();
  isOnInitSetFirst: boolean | undefined;

  constructor(
    public usersService: UsersService, 
    public stateService: StateService,
    public shoppingCartItemsService: ShoppingCartItemsService,
    public shoppingCartService: ShoppingCartService,
    public productsService: ProductsService,
    private notifyService: NotifyService
  ) {  }

  ngOnInit(): void {
    this.updateProductDetails.nameCategory = this.productsService.productDetails.nameCategory;
    this.updateProductDetails.price = this.productsService.productDetails.price;
    this.updateProductDetails.name = this.productsService.productDetails.name;
    //picture???????????
    this.isOnInitSetFirst= true;
  }
  
  onChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement
    this.productsService.productDetails.nameCategory = thisOptionValue.value;
  }

  adding(){
    this.stateService.addingOrEditing = 'adding';
    console.log(this.stateService.addingOrEditing);
  }

  editingProduct () {
    console.log(this.updateProductDetails);
    this.productsService.productDetails = this.updateProductDetails;

    this.productsService.updateProduct().subscribe( updatingProductResults => {
    this.productsService.products.map(product =>{
      if(product.idProduct === this.productsService.productDetails){
        product.name = this.productsService.productDetails.name;
        product.nameCategory = this.productsService.productDetails.nameCategory;
        product.price = this.productsService.productDetails.price;
        product.picture = this.productsService.productDetails.picture;
      }
    })
    this.productsService.categories = [...new Set(this.productsService.products.map((data: Product) => data.nameCategory)),];
    for (let i = 0; i < this.productsService.categories.length; i++) {
      this.productsService.productsByCategories[i] =
        this.productsService.products.filter((filterProductsByCategory) => {
          return ( filterProductsByCategory.nameCategory === this.productsService.categories[i] );
        });
    }
    this.notifyService.successfulRequest(updatingProductResults)
    },
    serverError => {
    this.stateService.errorMessage(serverError.status);
    this.notifyService.failedRequest(serverError.status , serverError.error.error)
    }) ;
  }

}
