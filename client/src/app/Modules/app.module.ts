import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../Components/Home/home.component';
import { AboutUsComponent } from '../Components/AboutUs/about-us.component';
import { ContactUsComponent } from '../Components/ContactUs/contact-us.component';
import { ProductsAndFormsComponent } from '../Components/ProductsAndForms/products-and-forms.component';
import { FormsComponent } from '../Components/ProductsAndForms/Forms/forms.component';
import { RegisterPartOneComponent } from '../Components/ProductsAndForms/Forms/register-part-one/register-part-one.component';
import { RegisterPartTwoComponent } from '../Components/ProductsAndForms/Forms/register-part-two/register-part-two.component';
import { LoginComponent } from '../Components/ProductsAndForms/Forms/login/login.component';
import { OrderComponent } from '../Components/ProductsAndForms/Products/order/order.component';
import { SearchComponent } from '../Components/ProductsAndForms/Products/search/search.component';
import { ProductsComponent } from '../Components/ProductsAndForms/Products/products.component';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from '../Components/ProductsAndForms/Products/add-product/add-product.component';
import { EditProductComponent } from '../Components/ProductsAndForms/Products/edit-product/edit-product.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MainComponent } from '../Components/ProductsAndForms/Products/main/main.component';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { ShoppingCartCardComponent } from '../Components/ProductsAndForms/Products/shopping-cart-card/shopping-cart-card.component';
import { ProductCardComponent } from '../Components/ProductsAndForms/Products/product-card/product-card.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from '../interceptors/AuthenticationInterceptor';
import { ModalComponent } from '../Components/modal/modal.component';
import { PopularCardComponent } from '../Components/Home/popular-card/popular-card.component';
import { NewCardComponent } from '../Components/Home/new-card/new-card.component';
import { MatIconModule } from "@angular/material/icon";
import { MenuComponent } from '../Components/ProductsAndForms/Products/menu/menu.component';
import { CategoryCardComponent } from '../Components/ProductsAndForms/Products/category-card/category-card.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutUsComponent,
    ContactUsComponent,
    ProductsAndFormsComponent,
    FormsComponent,
    RegisterPartOneComponent,
    RegisterPartTwoComponent,
    LoginComponent,
    OrderComponent,
    SearchComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    MainComponent,
    ProductCardComponent,
    ShoppingCartCardComponent,
    ModalComponent,
    PopularCardComponent,
    NewCardComponent,
    MenuComponent,
    CategoryCardComponent,
    HighlightPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule,
    HttpClientModule,
    MatIconModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    HighlightPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
