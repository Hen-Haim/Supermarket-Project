import { Component, OnInit } from '@angular/core';
import { faAt, faHome, faPaperclip, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  faAt = faAt;
  faPaperclip = faPaperclip;
  faHome = faHome;

  constructor() { }

  ngOnInit(): void {
  }

}
