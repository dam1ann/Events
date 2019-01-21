import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../core/models/user.interface';
import { Store } from '@ngrx/store';

import * as userActions from '../core/store/user/user.actions';

interface AppState {
  user: User;
}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userStore: Store<AppState>) {
  }

  ngOnInit() {
    this.user$ = this.userStore.select('user');
    this.userStore.dispatch(new userActions.GetUser());
  }

  login() {
    console.log('test');
    this.userStore.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.userStore.dispatch(new userActions.Logout());
  }

}
