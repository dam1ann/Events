import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from './core/models';
import { Store } from '@ngrx/store';
import { UserState } from './core/store/user/user.reducer';
import { Router } from '@angular/router';
import * as userActions from './core/store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @Input() content: TemplateRef<any>;
  user$: Observable<IUser>;

  constructor(private userStore: Store<UserState>,
              private router: Router) {
  }

  ngOnInit() {
    this.user$ = this.userStore.select('userState', 'user');
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
