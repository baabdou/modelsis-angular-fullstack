import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/Product';
import { ProductType } from '../models/ProductType';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  types: ProductType[] = [];
  mode:number = 0
  p: Product = new Product()

  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

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
    this.authService.getProduct(this.activatedRoute.snapshot.params['id']).subscribe(
      resp => {
        this.p = resp; 
        console.log(">>>", this.p)
      }, error => {
        console.log("Erreur!!!")
      }
    );
  }

  onUpdateProduct(f: NgForm) {
    this.p.name = f.value.name
    this.p.dateCreated = new Date()
    this.p.type = f.value.type
    this.authService.updateProduct(this.activatedRoute.snapshot.params['id'], this.p).subscribe(
      resp => {
        this.p = resp; 
        this.router.navigateByUrl('/products');
      }, error => {
        console.log("Erreur!!!")
      }
    );
  }

  onCancel() {
    this.router.navigateByUrl('/products');
  }

}
