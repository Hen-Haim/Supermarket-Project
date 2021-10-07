import { ProductsService } from 'src/app/services/products.service';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent {
  @Input() indexOfElement: number;
  faArrowCircleRight = faArrowCircleRight;
  
  constructor(
    public productsService:ProductsService,
    private router: Router
    ) { }

  filterProductByCategory(num: number){
    this.productsService.toWhatCategoryShouldIFilter = num;
    this.router.navigate(["/products-and-forms/products/main"]);
  }

}
