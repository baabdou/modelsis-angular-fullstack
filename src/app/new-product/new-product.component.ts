import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { ProductType } from '../models/ProductType';
import {FormControl, FormGroup} from '@angular/forms';
import { Product } from '../models/Product';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {
  // product: Product = 
  types: ProductType[] = [];
  mode: number = 0;
  
  product: Product = new Product();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getProductType().subscribe(
      resp => {
        this.types = resp;
        console.log(">>>", this.types)
      }, error => {
        console.log("Erreur!!!")
        this.mode == 1
      }
    );
  }

  onCreateProduct(f: NgForm) {
    console.log("form value", f.value);
    this.product.name = f.value.name
    this.product.dateCreated = new Date()
    this.product.type = f.value.type
    console.log("product", this.product);
    this.authService.addProduct(this.product).subscribe(
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
