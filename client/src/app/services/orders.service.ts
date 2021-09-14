import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AmountsForHome, Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})

export class OrdersService {

  months: string[] = 
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  years: string[] = 
  ['2021', '2022', '2023', '2024', '2025', '2026', '2027', '2028', '2029', '2030', '2031', '2032'];

  cardCompany: string[] = 
  ['Mastercard', 'Visa Card', 'Visa Master Card'];

  orderDetails: Order = new Order();

  constructor(private http: HttpClient) { }
  
  addOrder(orderDetails: Order): Observable<string> {
    return this.http.post<string>("http://localhost:3001/orders", orderDetails);
  }
  
  getUsersOrdersAndProductsAmounts(): Observable<AmountsForHome[]> {
    return this.http.get<AmountsForHome[]>("http://localhost:3001/orders");
  }

  checkForDateAvailability(date: Date): Observable<number> {
    return this.http.get<number>("http://localhost:3001/orders/" + date);
  }

}
