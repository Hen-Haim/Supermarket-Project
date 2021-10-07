import { ProductsService } from 'src/app/services/products.service';
import { UsersService } from './../../../../services/users.service';
import { StateService } from 'src/app/services/state.service';
import { Component, Input } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Product } from 'src/app/models/Product';
import { ShoppingCartItem } from 'src/app/models/ShoppingCartItem';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product: Product & ShoppingCartItem ;
  public imageUrl: any ;
  faEdit = faEdit;
  
  constructor(
    public stateService:StateService,
    public usersService:UsersService,
    public productsService: ProductsService,
  ) {}

  turnModalOn(){
    this.stateService.productForModal = this.product;
    this.stateService.modalStatus = "product updating";
    this.stateService.display = "block";
  }

  editing(){
    this.stateService.addingOrEditing = 'editing';
    this.productsService.productDetails = this.product;
  }

};
