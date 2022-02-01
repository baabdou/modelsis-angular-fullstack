import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductType } from '../models/ProductType';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-new-product-type',
  templateUrl: './new-product-type.component.html',
  styleUrls: ['./new-product-type.component.scss']
})
export class NewProductTypeComponent implements OnInit {

  type: ProductType = new ProductType();
  mode: number = 0;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onCreateProduct(f: NgForm) {
    console.log("form value", f.value);
    this.type.name = f.value.name
    console.log("product type", this.type);
    
    this.authService.addProductType(this.type).subscribe(
      resp => {
        this.mode = 2
        this.router.navigateByUrl('/products');
      }, error => {
        console.log("Erreur!!!")
        this.mode = 1
      }
    );
  }

  onCancel() {
    this.router.navigateByUrl('/products');
  }

}
