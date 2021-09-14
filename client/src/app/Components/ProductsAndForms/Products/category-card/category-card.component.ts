import { ProductsService } from 'src/app/services/products.service';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.css']
})
export class CategoryCardComponent implements OnInit {
  @Input() indexOfElement: number;
  faArrowCircleRight = faArrowCircleRight
  
  constructor(
    public productsService:ProductsService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  filterProductByCategory(num: number){
    this.productsService.toWhatCategoryShouldIFilter = num;
    this.router.navigate(["/products-and-forms/products/main"]);
  }

}
