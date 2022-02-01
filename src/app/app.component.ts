import { Component } from '@angular/core';
import {AuthService} from './service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'modelsis-angular-fullstack';

  constructor(private authentificationService: AuthService , private  router: Router) {
  }

  // onLogout(){
  //   this.authentificationService.logout();
  //   this.router.navigateByUrl('/login');
  // }
}
