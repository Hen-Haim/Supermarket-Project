import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/Product';
import { ShoppingCartItem, PopularAndNew } from './../models/ShoppingCartItem';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartItemsService {
  public allCategories: ShoppingCartItem[] = [];
  openCart: null | ShoppingCartItem [] & Product[] | undefined;
  lastOrder: null | ShoppingCartItem [] & Product[] | undefined;
  currentCart:  null | ShoppingCartItem [] & Product[] | undefined;
  currentCartId: number | string | undefined;

  firstButtonForHome: string = ""; //"Welcome", "Shop Again", "last Purchase ??/??/????"
  secondButtonForHome: string = ""; //"Shop Now", "Continue Shopping"
  newCartOrOldCart: string = ""; // "new", "last", "continue"

  constructor(
    private http: HttpClient, 
    ) { }

  getPastOrders(): Observable<Product[] & Product[]> {
    return this.http.get<Product[] & Product[]>("http://localhost:3001/shopping-cart-items/past-orders");
  }

  getPopularItems(): Observable<PopularAndNew[]> {
    return this.http.get<PopularAndNew[]>("http://localhost:3001/shopping-cart-items/popular");
  }

  getOpenCartItems(): Observable<ShoppingCartItem[] & Product[]> {
    let url = "http://localhost:3001/shopping-cart-items/open-cart/";
    return this.http.get<ShoppingCartItem[] & Product[]>(url + this.currentCartId);
  }

  addToCart(newProductInCart: Product): Observable<Product> {
    return this.http.post<Product>("http://localhost:3001/shopping-cart-items/" + this.currentCartId, newProductInCart);
  }

  updateOneCart(product: Product): Observable<string> {
    return this.http.patch<string>("http://localhost:3001/shopping-cart-items/" + this.currentCartId, product);
  }

  removeOneItem(shoppingCartItemId: number): Observable<string> {
    const requestOptions: Object = {
      responseType: 'text'
    }
    return this.http.delete<string>("http://localhost:3001/shopping-cart-items/" + shoppingCartItemId, requestOptions);
  }

  deleteAllItemsOnCart(): Observable<void> {
    return this.http.delete<void>("http://localhost:3001/shopping-cart-items");
  }
}
