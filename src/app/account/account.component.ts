import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../core/models/user.interface';
import { Observable } from 'rxjs';

interface AppState {
  user: User;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  user$: Observable<User>;

  constructor(private userStore: Store<AppState>) {
  }

  ngOnInit() {
    this.user$ = this.userStore.select('user');
  }

}
