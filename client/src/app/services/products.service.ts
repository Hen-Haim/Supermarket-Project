import { NotifyService } from './notify.service';
import { ShoppingCartItem } from './../models/ShoppingCartItem';
import { ShoppingCartItemsService } from './shoppingCartItems.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  products: Product[] = [];  //all products
  productDetails: Product = new Product();  //one product
  productsByCategories: (Product[])[] | [] = [];
  searchTyping: string | undefined;
  searchResultsServer: Product[] & ShoppingCartItem[] = [];
  toWhatCategoryShouldIFilter: number = 0;
  categories:(string | undefined)[] = [];
  categoriesPhotos: string[] | undefined;

  constructor(
    private http: HttpClient, 
    public shoppingCartItemsService: ShoppingCartItemsService,
    public notifyService: NotifyService
  ) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/special-get/" + this.shoppingCartItemsService.currentCartId);  
  }

  searchResults(): Observable<Product[]> {
    return this.http.get<Product[]>("http://localhost:3001/products/" + this.searchTyping + '/' + this.shoppingCartItemsService.currentCartId);
  }

  updateProduct(): Observable<string> {
    return this.http.put<string>("http://localhost:3001/products/", this.productDetails);
  }

  addProduct(myFormData:FormData): Observable<string> {
    return this.http.post<string>("http://localhost:3001/products", myFormData);
  }

}
