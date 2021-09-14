import { Notyf } from 'notyf';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  private notifications = new Notyf({
    duration:3000,
    ripple:false,
    position:{
      x:'center',
      y:'top'
    }
  })

  public successfulRequest(message: string){
    this.notifications.success(message);
  }

  public failedRequest(status: string | number, message:string){
    this.notifications.error('Error! <br/>Status: ' + status + ',<br/> Message: ' + message );
  }

}
