import { RegisterGuard } from './../guards/user/register.guard';
import { UserGuard } from './../guards/user/user.guard';
import { MenuComponent } from './../Components/ProductsAndForms/Products/menu/menu.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from '../Components/AboutUs/about-us.component';
import { ContactUsComponent } from '../Components/ContactUs/contact-us.component';
import { HomeComponent } from '../Components/Home/home.component';
import { FormsComponent } from '../Components/ProductsAndForms/Forms/forms.component';
import { LoginComponent } from '../Components/ProductsAndForms/Forms/login/login.component';
import { RegisterPartOneComponent } from '../Components/ProductsAndForms/Forms/register-part-one/register-part-one.component';
import { RegisterPartTwoComponent } from '../Components/ProductsAndForms/Forms/register-part-two/register-part-two.component';
import { ProductsAndFormsComponent } from '../Components/ProductsAndForms/products-and-forms.component';
import { MainComponent } from '../Components/ProductsAndForms/Products/main/main.component';
import { OrderComponent } from '../Components/ProductsAndForms/Products/order/order.component';
import { ProductsComponent } from '../Components/ProductsAndForms/Products/products.component';
import { SearchComponent } from '../Components/ProductsAndForms/Products/search/search.component';

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "about-us", component: AboutUsComponent },
  { path: "contact-us", component: ContactUsComponent },

  { path: "products-and-forms", component: ProductsAndFormsComponent, children:[
    { path: "forms", canActivate: [UserGuard], component: FormsComponent, children:[
        { path: "register-part-one", component: RegisterPartOneComponent },
        { path: "register-part-two", canActivate: [RegisterGuard], component: RegisterPartTwoComponent },
        { path: "login", component: LoginComponent },
        { path: "", redirectTo: "login", pathMatch: "full" },
      ] 
    },
    { path: "products", component: ProductsComponent, children:[
        { path: "menu", component: MenuComponent},
        { path: "main", component: MainComponent},
        { path: "order", canActivate: [UserGuard], component: OrderComponent},
        { path: "search", component: SearchComponent},
        { path: "", redirectTo: "menu", pathMatch: "full" },
        { path: "products", redirectTo: "menu", pathMatch: "full" },
      ] 
    },
      { path: "", redirectTo: "products/menu", pathMatch: "full" }
    ] 
  },

  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "*", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
