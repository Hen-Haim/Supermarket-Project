import { Component} from '@angular/core';
import { faAt, faHome, faPaperclip } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {

  faAt = faAt;
  faPaperclip = faPaperclip;
  faHome = faHome;

  constructor() { }
}
