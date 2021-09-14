import { ProductsService } from './../../../../services/products.service';
import { ShoppingCartItemsService } from 'src/app/services/shoppingCartItems.service';
import { StateService } from 'src/app/services/state.service';
import { ShoppingCartItem } from './../../../../models/ShoppingCartItem';
import { Product } from './../../../../models/Product';
import { Component, Input } from '@angular/core';
import { faUser, faAngleUp, faShoppingCart, faEdit, faTimes, faTrash, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-shopping-cart-card',
  templateUrl: './shopping-cart-card.component.html',
  styleUrls: ['./shopping-cart-card.component.css']
})
export class ShoppingCartCardComponent {
  @Input() cartItems: ShoppingCartItem[] & Product[] | null | undefined;
  @Input() oneItemOfCart: ShoppingCartItem & Product ;

  faUser = faUser;
  faAngleUp = faAngleUp;
  faShoppingCart = faShoppingCart;
  faEdit = faEdit;
  faTimes = faTimes;
  faTrash = faTrash;
  faMinus = faMinus;
  faPlus = faPlus;
  
  constructor(
    public stateService:StateService,
    public shoppingCartItemsService:ShoppingCartItemsService,
    public productsService:ProductsService,
  ) {}

  activateModalForProduct(){
    this.stateService.productForModal = this.oneItemOfCart;
    this.stateService.modalStatus = "product updating";
    this.stateService.display = "block";
  }

  activateModalForMessage(){
    this.stateService.productForModal = this.oneItemOfCart;
    this.stateService.modalStatus = "warning for product";
    this.stateService.headerForModal = "Deleting This Product";
    this.stateService.mainContentForModal = "Are You Sure You Want To Delete This Product?";
    this.stateService.display = "block"; 
  }

}
