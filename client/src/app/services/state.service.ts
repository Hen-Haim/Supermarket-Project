import { ShoppingCartItem } from './../models/ShoppingCartItem';
import { Injectable } from '@angular/core';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root'
})

export class StateService {

  placeholderText: string = 'Search In Products';
  productForModal:Product & ShoppingCartItem | undefined;
  headerForModal:string = "";
  mainContentForModal: string = "";
  display: string = "none";
  modalStatus: string = "";  // "warning for product" "product updating" "warning for order" "ordering successfully" "warning for all products"
  addingOrEditing: string = "adding";

  errorMessage(status: number){
    if(status === 606 || status === 605){
      window.location.reload();
      localStorage.removeItem("userDetailsAfterLogin");
    }
  }
}
