import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(
    public productsService: ProductsService
  ) { }

}
