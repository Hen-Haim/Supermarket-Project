import { StateService } from 'src/app/services/state.service';
import { ShoppingCartItemsService } from './../../../../services/shoppingCartItems.service';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from 'src/app/services/products.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faArrowCircleRight = faArrowCircleRight;

  constructor(
    public productsService:ProductsService,
    public shoppingCartItemsService: ShoppingCartItemsService,
    private detectChangesInProducts: ChangeDetectorRef,
    private stateService: StateService
  ) {}


  ngAfterContentChecked() {
    this.detectChangesInProducts.detectChanges();
  }

  ngOnInit(): void {
    this.productsService.searchTyping = '';
    this.stateService.placeholderText = 'Search In Products';
    console.log(this.productsService.products)
    console.log(this.productsService.productsByCategories);
  }

}
