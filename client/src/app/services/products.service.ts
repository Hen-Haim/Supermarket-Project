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

  constructor(
    private http: HttpClient, 
    public shoppingCartItemsService: ShoppingCartItemsService
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

  addProduct(): Observable<string> {
    return this.http.post<string>("http://localhost:3001/products", this.productDetails);
  }

  async getImage(): Promise<any> {
    try {
      let results = await this.http.get<Blob>("http://localhost:3001/products/images" + this.productDetails).toPromise(); 
      return results;
    } catch (error) {
      
    }
     
  }

}
