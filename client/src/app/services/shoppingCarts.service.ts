import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// MODELS
import { ShoppingCart } from '../models/ShoppingCart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
  public cart: ShoppingCart = {};
  public total: number = 0;
  public cartItems: Product[] = [];
  public searchInCartResults: string[] = [];

  constructor(private http: HttpClient) {  }

  public changeUserIdForShoppingCart(shoppingCartId: number | string): Observable<string> {
    return this.http.put<string>("http://localhost:3001/shopping-carts/" + shoppingCartId, "");
  }

  public addNewShoppingCart(): Observable<number | string> {
    return this.http.post<number | string>("http://localhost:3001/shopping-carts", "");
  }

  public deleteShoppingCart(shoppingCartId:number): Observable<void> {
    return this.http.delete<void>("http://localhost:3001/shopping-carts/" + shoppingCartId);
  }
}
