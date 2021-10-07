import { StateService } from 'src/app/services/state.service';
import { HttpClient } from '@angular/common/http';
import { NotifyService } from './../../../../services/notify.service';
import { Product } from 'src/app/models/Product';
import { ProductsService } from './../../../../services/products.service';
import { Component } from '@angular/core';
import { faArchive, faCarrot, faDollarSign, faImage } from '@fortawesome/free-solid-svg-icons';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

  faArchive = faArchive;
  faCarrot= faCarrot;
  faDollarSign = faDollarSign;
  faImage = faImage;
  newProductDetails:Product = new Product();

  constructor(
    public shoppingCartItemsService: ShoppingCartItemsService,
    public productsService: ProductsService,
    private notifyService: NotifyService,
    private http: HttpClient,
    private stateService:StateService
  ) { }

  onChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement
    this.productsService.productDetails.nameCategory = thisOptionValue.value;
  }

  onInputChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement;
    this.productsService.productDetails.nameCategory = thisOptionValue.value;
    if(thisOptionValue.value === "" || thisOptionValue.value === null){
      this.productsService.productDetails.nameCategory = undefined;
    }
    for (let i = 0; i < this.productsService.categories.length; i++) {
      if(this.productsService.categories[i] === this.newProductDetails.nameCategory){
        this.newProductDetails.idCategory = i + 1;
      }
    }
  }

  addingNewProduct(){
    const myFormData = Product.convertToFormData(this.newProductDetails);
    this.productsService.productDetails = this.newProductDetails;
    this.productsService.products.push(this.newProductDetails);

    this.productsService.addProduct(myFormData).subscribe( lastCartItemsIfExist => {
      this.notifyService.successfulRequest(lastCartItemsIfExist)
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    ()=> this.bringAllProducts()) ;
  }

  async bringAllProducts() {
    try {
      let results =  await this.http.get<Product[]>("http://localhost:3001/products/special-get/" + this.shoppingCartItemsService.currentCartId).toPromise();  
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
  
  public saveImage(args: Event): void {
    this.newProductDetails.picture = (args.target as HTMLInputElement).files;
  }

}
