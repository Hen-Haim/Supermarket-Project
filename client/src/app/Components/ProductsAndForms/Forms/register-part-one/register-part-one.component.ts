import { StateService } from 'src/app/services/state.service';
import { NotifyService } from './../../../../services/notify.service';
import { UsersService } from 'src/app/services/users.service';
import { Component } from '@angular/core';
import { faLock, faUnlock, faUser } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-part-one',
  templateUrl: './register-part-one.component.html',
  styleUrls: ['./register-part-one.component.css']
})
export class RegisterPartOneComponent {
  faUnlock = faUnlock;
  faLock = faLock;
  faUser = faUser;

  constructor(
    public usersService:UsersService,
    private router: Router,
    private notifyService: NotifyService,
    private stateService:StateService
  ) { }

  movingOnToNextPart(){
    console.log(this.usersService.registerCompletedDetails);
    this.usersService.registerPart01(this.usersService.registerCompletedDetails).subscribe( 
    () => { },
    serverError => {
      this.stateService.errorMessage(serverError.status);
      this.notifyService.failedRequest(serverError.status , serverError.error.error)
    },
    () => {
      localStorage.setItem("isRegisterFirstPart", JSON.stringify("yes")); 
      this.router.navigate(["/products-and-forms/forms/register-part-two"]);     
    }) 
  }
}
