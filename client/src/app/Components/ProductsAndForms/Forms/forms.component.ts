import { ProductsService } from 'src/app/services/products.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHome } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent {
  formPath:string = window.location.pathname;
  faHome = faHome;

  constructor(    
    private router: Router,
    public productsService: ProductsService
    ) { }

  changeFormPathToRegister(){
    this.router.navigate(["/products-and-forms/forms/register-part-one"]);    
    this.formPath = "http://localhost:4200/products-and-forms/forms/register-part-one";
  }

  changeFormPathToLogin(){
    this.router.navigate(["/products-and-forms/forms/login"]);
    this.formPath = "http://localhost:4200/products-and-forms/forms/login";
  }

}
