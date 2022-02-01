import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { ProductType } from '../models/ProductType';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  host = 'http://localhost:8080';
  jwtToken: string = "";
  user_id: number = 0;
  username: string = "";
  roles: Array<any> = [];

  constructor(private http: HttpClient) { }

  login(user: any) {
    return this.http.post(this.host + '/login', user, { observe: 'response' });
  }

  saveToken(jwt: string) {
    this.jwtToken = jwt;
    localStorage.setItem('token', String(jwt));
    this.parseJWT();
  }

  // Add new product
  addProduct(product: Product): Observable<Product> {
    if (this.jwtToken == null || this.jwtToken == "") { this.loadToken(); }
    let headers = new HttpHeaders({ 'authorization': 'Basic ' + this.jwtToken });
    return this.http.post<Product>(this.host + "/product", product, { headers: headers });
  }

  // Get All Product
  getProducts(): Observable<Product[]> {
    if (this.jwtToken == null || this.jwtToken == "") { this.loadToken(); }
    let headers = new HttpHeaders({ 'authorization': 'Basic ' + this.jwtToken });
    return this.http.get<Product[]>(this.host + "/products", { headers: headers });
  }

    // Get One Product
    getProduct(id: number): Observable<Product> {
      if (this.jwtToken == null || this.jwtToken == "") { this.loadToken(); }
      let headers = new HttpHeaders({ 'authorization': 'Basic ' + this.jwtToken });
      return this.http.get<Product>(this.host + "/product/"+id, { headers: headers });
    }

  // Add new product type
  addProductType(type: ProductType): Observable<ProductType> {
    if (this.jwtToken == null || this.jwtToken == "") { this.loadToken(); }
    let headers = new HttpHeaders({ 'authorization': 'Basic ' + this.jwtToken });
    return this.http.post<ProductType>(this.host + "/productType", type, { headers: headers });
  }

  // Get All Product Type
  getProductType(): Observable<ProductType[]> {
    if (this.jwtToken == null || this.jwtToken == "") { this.loadToken(); }
    let headers = new HttpHeaders({ 'authorization': 'Basic ' + this.jwtToken });
    return this.http.get<ProductType[]>(this.host + "/productTypes", { headers: headers });
  }


  // Update a product
  updateProduct(id: number, product: Product): Observable<Product> {
    if (this.jwtToken == null || this.jwtToken == "") { this.loadToken(); }
    let headers = new HttpHeaders({ 'authorization': 'Basic ' + this.jwtToken });
    return this.http.put<Product>(this.host + "/product/"+id, product, { headers: headers });
  }

  parseJWT() {
    const jwtHelpers = new JwtHelperService();
    let objJWT = jwtHelpers.decodeToken(this.jwtToken);
    this.username = objJWT.sub;
    this.user_id = objJWT.user_id;
    console.log(objJWT.user_id);
    this.roles = objJWT.roles;
    // console.log(this.roles);
  }
  loadToken() {
    this.jwtToken = String(localStorage.getItem('token') || '');
  }

  logout() {
    this.jwtToken = "";
    localStorage.removeItem('token');
    this.initParams();
  }
  initParams() {
    this.jwtToken = "";
    this.username = "";
    this.roles = [];
  }

  isAdmin() {
    return this.roles.indexOf('ADMIN') >= 0;
  }
  isUser() {
    return this.roles.indexOf('USER') >= 0;
  }
  isAuthenticated() {
    return this.roles && (this.isAdmin() || this.isUser());
  }


}
