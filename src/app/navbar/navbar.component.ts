import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe(data =>{
      console.log(data);
    })
  }

  async login() {
    await this.authService.login();
  }

  async logout() {
    await this.authService.logout();
  }

}
