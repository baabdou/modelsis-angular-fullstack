import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user: any = {
    username : "",
    password : ""
  };

  constructor(private authentificationService: AuthService, private router: Router) { }
  mode = 0;
  ngOnInit(): void {
  }

  onLogin(f: NgForm) {
    console.log(f.value.username)
    this.user = {
      username: f.value.username,
      password: f.value.password
    }
      this.authentificationService.login(this.user).subscribe(
        resp => {
          const jwt = String(resp.headers.get('authorization'));
          this.authentificationService.saveToken(jwt);
          this.router.navigateByUrl('/products');
        }, error => {
          this.mode = 1;
        }
      );
  }

}
