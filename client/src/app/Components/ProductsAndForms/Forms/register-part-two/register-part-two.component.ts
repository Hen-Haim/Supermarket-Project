import { StateService } from 'src/app/services/state.service';
import { NotifyService } from './../../../../services/notify.service';
import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { faRoad, faCity, faUserCog } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-part-two',
  templateUrl: './register-part-two.component.html',
  styleUrls: ['./register-part-two.component.css']
})
export class RegisterPartTwoComponent  {
  faCity = faCity;
  faRoad = faRoad;
  faUserCog = faUserCog;

  constructor(
    public usersService:UsersService,
    private router: Router,
    private notifyService:NotifyService,
    private stateService: StateService
  ) { }

  onChange(optionValue:Event){
    let thisOptionValue = optionValue.target as HTMLTextAreaElement
    this.usersService.registerCompletedDetails.city = thisOptionValue.value;
  }

  registerWithFullDetails(){
    this.usersService.registerPart02(this.usersService.registerCompletedDetails).subscribe( resultAfterRegister => {
      this.notifyService.successfulRequest(resultAfterRegister);
    },
    serverError => {
    this.stateService.errorMessage(serverError.status);
    this.notifyService.failedRequest(serverError.status , serverError.error.error);
    },
    () => {
      localStorage.removeItem("isRegisterFirstPart");
      this.hiddenLogin();
    }) 
  }

  hiddenLogin(){
    this.usersService.login(this.usersService.registerCompletedDetails).subscribe( resultUserDetailsAfterLogin => {
      this.usersService.userDetailsAfterLogin = resultUserDetailsAfterLogin;
      localStorage.setItem("userDetailsAfterLogin", JSON.stringify(resultUserDetailsAfterLogin));
    },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () => this.router.navigate(["/products-and-forms/products"])) 
  }

}
