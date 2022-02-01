import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ProductTypeComponent } from './product-type/product-type.component';
import { NewProductComponent } from './new-product/new-product.component';
import { DatePipe } from '@angular/common';
import { NewProductTypeComponent } from './new-product-type/new-product-type.component';
import { EditProductComponent } from './edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductComponent,
    ProductTypeComponent,
    NewProductComponent,
    NewProductTypeComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
