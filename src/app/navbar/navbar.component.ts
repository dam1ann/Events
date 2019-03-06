import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../core/models/user.interface';
import { Store } from '@ngrx/store';

import * as userActions from '../core/store/user/user.actions';
import { Router } from '@angular/router';
import { UserState } from '../core/store/user/user.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  user$: Observable<IUser>;

  constructor(private userStore: Store<UserState>,
              private router: Router) {
  }

  ngOnInit() {
    this.user$ = this.userStore.select( 'userState', 'user');
    this.userStore.dispatch(new userActions.GetUser());
  }

  login() {
    this.userStore.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.userStore.dispatch(new userActions.Logout());
  }

  async goToModal() {
    await this.router.navigate([`${this.router.url}/create`]);
  }
}
