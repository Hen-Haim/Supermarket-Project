import { StateService } from 'src/app/services/state.service';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit{
  @Input() indexOfElement: number;

  constructor(
    public productsService:ProductsService,
    private detectChangesInProducts: ChangeDetectorRef,
    private stateService: StateService
  ) {}

  ngOnInit(){
    this.productsService.searchTyping = '';
    this.stateService.placeholderText = 'Search In Products';
  }


  ngAfterContentChecked() {
    this.detectChangesInProducts.detectChanges();
  }

  filterAllProducts(num: number){
    this.productsService.toWhatCategoryShouldIFilter = num;
  }

  returnClass(num: number){
    if(num === this.productsService.toWhatCategoryShouldIFilter+1){
      return `categories-main-${num}-chosen`;
    }
    return `categories-main-${num}`;
  }

}
