import { StateService } from './../../services/state.service';
import { NotifyService } from './../../services/notify.service';
import { Product } from './../../models/Product';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-and-forms',
  templateUrl: './products-and-forms.component.html',
  styleUrls: ['./products-and-forms.component.css'],
})
export class ProductsAndFormsComponent implements OnInit {

  constructor(
    public productsService: ProductsService,
    private router: Router,
    private notifyService: NotifyService,
    public stateService:StateService,
    private detectChangesInPlaceholder: ChangeDetectorRef
  ) {}


  ngAfterContentChecked() {
  this.detectChangesInPlaceholder.detectChanges();
  }

  ngOnInit(): void {
    this.stateService.placeholderText = window.location.pathname.includes('order') ? 'Search In Cart' : 'Search In Products';
  }

  openSearchComponent() {
    if(!window.location.pathname.includes('order')){
      this.searchResultsByServer()
    }
  }

  searchResultsByServer(){
    this.productsService.searchResults().subscribe( searchResultsFromServer => {
      this.productsService.searchResultsServer = searchResultsFromServer;
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    ()=>{
      this.router.navigate(['/products-and-forms/products/search']);
    })
  }

}
