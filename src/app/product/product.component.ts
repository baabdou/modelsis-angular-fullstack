import { Component, OnInit } from '@angular/core';
import { Product } from '../models/Product';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  products: Product[] = []
  constructor(private authService: AuthService, private router: Router, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.authService.getProducts().subscribe(
      resp => {
        this.products = resp;
        console.log(">>>", this.products)
      }, error => {
        console.log("Erreur!!!")
      }
    );
  }

  onNewProduct() {
    this.router.navigateByUrl('/new-product');
  }

  formatCreatedDate(date: Date) {
    return this.datePipe.transform(date, 'dd/MM/yyyy');
  }

  onNewType() {
    this.router.navigateByUrl('/new-type');
  }

  onEditProduct(id: number) {
    this.router.navigate(['/edit-product', id]);
  }

}
