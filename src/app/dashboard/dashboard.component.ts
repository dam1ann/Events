import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ListState } from '../core/store/event-list/event-list.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as listActions from '../core/store/event-list/event-list.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {

  events$: Observable<any>;

  constructor(private store: Store<ListState>) {
  }

  ngOnInit() {
    this.events$ = this.store.select('listState', 'list').pipe(
      tap(data => {
        console.log(data);
      })
    );

    this.store.dispatch(new listActions.GetEvents());
  }
}
