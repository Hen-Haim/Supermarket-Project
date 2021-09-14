import { PopularAndNew } from './../../../models/ShoppingCartItem';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent implements OnInit {
  @Input() oneNewItem: PopularAndNew = new PopularAndNew()

  constructor() { }

  ngOnInit(): void {
  }

}
