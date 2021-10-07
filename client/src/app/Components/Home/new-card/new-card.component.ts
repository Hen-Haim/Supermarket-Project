import { PopularAndNew } from './../../../models/ShoppingCartItem';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent {
  @Input() oneNewItem: PopularAndNew = new PopularAndNew()

  constructor() { }

}
