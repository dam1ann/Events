import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { IUser } from './core/models';
import { Store } from '@ngrx/store';
import { UserState } from './core/store/user/user.reducer';
import { NavigationEnd, Router } from '@angular/router';
import * as userActions from './core/store/user/user.actions';
import { FiltersService } from './core/services';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @Input() content: TemplateRef<any>;
  user$: Observable<IUser>;
  homeRoute: boolean;

  constructor(private userStore: Store<UserState>,
              private router: Router,
              private filters: FiltersService,
              private location: Location,
              private ngxModalService: NgxSmartModalService) {
  }

  ngOnInit() {
    this.user$ = this.userStore.select('userState', 'user');
    this.userStore.dispatch(new userActions.GetUser());
    this.homeRoute = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        const {url} = event;

        this.homeRoute = (url === '/');
      }
    });
  }

  login() {
    this.userStore.dispatch(new userActions.GoogleLogin());
  }

  logout() {
    this.userStore.dispatch(new userActions.Logout());
  }

  back() {
    this.location.back();
  }

  openModal(name) {
    this.ngxModalService.getModal(name).open();
  }


  async goToModal() {
    await this.router.navigate([`${this.router.url}/create`]);
  }
}
