import { ProductsService } from 'src/app/services/products.service';
import { NotifyService } from './../../../../services/notify.service';
import { StateService } from './../../../../services/state.service';
import { OrdersService } from './../../../../services/orders.service';
import { UsersService } from './../../../../services/users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCalendarAlt, faCity, faCreditCard, faRoad, faShippingFast } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit,OnDestroy {
  faCity = faCity;
  faRoad = faRoad;
  faCalendarAlt = faCalendarAlt;
  faCreditCard = faCreditCard;
  faShippingFast = faShippingFast;
  cardCompanyInput:string = "";
  isDateAvailable:number = 0;

  constructor(
    public usersService: UsersService,
    public ordersService: OrdersService,
    public stateService: StateService,
    public notifyService: NotifyService,
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.productsService.searchTyping = '';
    this.stateService.placeholderText = 'Search In Cart';
  }

  onChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement
    this.ordersService.orderDetails.cityToDeliver = thisOptionValue.value;
    console.log(this.ordersService.orderDetails.cityToDeliver);
  }

  valueForCardCompany(event: Event){
    console.log((event.target as HTMLInputElement).value)
    this.cardCompanyInput = (event.target as HTMLInputElement).value;
  }

  didChooseCardCompany(){
    if(this.cardCompanyInput !== "" && this.cardCompanyInput !== 'Card Company'){
      return false
    }
    return true
  }

  returnPattern(){
    let pattern:string;
    if( this.cardCompanyInput === 'Mastercard'){
      pattern = '^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$'
      return pattern
    }else if( this.cardCompanyInput === 'Visa Card'){
      pattern = '^4[0-9]{12}(?:[0-9]{3})?$'
      return pattern
    }else {
      pattern = '^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$'
      return pattern
    }
  }

  
  activateModalForMessageOrder(){
    this.stateService.modalStatus = "warning for order";
    this.stateService.headerForModal = "Ordering This Cart";
    this.stateService.mainContentForModal = "Are You Sure You Want To Make This Transaction?";
    this.stateService.display = "block"; 
  }

  bringUserAddress(){
    this.usersService.getUserDetailsForOrder().subscribe( resultUserDetails => {
    this.ordersService.orderDetails.cityToDeliver = resultUserDetails.city;
    this.ordersService.orderDetails.streetToDeliver = resultUserDetails.street;
    },
    serverError => {
    this.stateService.errorMessage(serverError.status);
    this.notifyService.failedRequest(serverError.status , serverError.error.error)
    }) 
  }

  dateAvailability(){
    console.log(this.ordersService.orderDetails.shippingDate)
    this.ordersService.checkForDateAvailability(this.ordersService.orderDetails.shippingDate).subscribe( dateAvailabilityResults => {
    this.isDateAvailable = dateAvailabilityResults;
    },
    serverError => {
    this.stateService.errorMessage(serverError.status);
    this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    ()=>{
      console.log(this.isDateAvailable);
    }) 
  }

  ngOnDestroy():void{
    this.stateService.placeholderText = 'Search In Products';
  }

}
