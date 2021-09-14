import { PopularAndNew } from './../../../models/ShoppingCartItem';
import { Component, Input, OnInit } from '@angular/core';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-popular-card',
  templateUrl: './popular-card.component.html',
  styleUrls: ['./popular-card.component.css']
})
export class PopularCardComponent implements OnInit {
  @Input() onePopularItem: PopularAndNew = new PopularAndNew();
  @Input() indexOfElement: number;

  faMedal = faMedal;

  constructor() { }

  ngOnInit(): void {
  }

}
