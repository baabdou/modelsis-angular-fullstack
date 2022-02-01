import { NgModule } from '@angular/core';
import {LoginComponent} from './login/login.component';
import { ProductComponent } from './product/product.component'
import { NewProductComponent } from './new-product/new-product.component'
import { NewProductTypeComponent } from './new-product-type/new-product-type.component'
import { EditProductComponent } from './edit-product/edit-product.component'
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'products', component: ProductComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: 'edit-product/:id', component: EditProductComponent},
  {path: 'new-type', component: NewProductTypeComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
