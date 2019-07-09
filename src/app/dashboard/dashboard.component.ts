import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as listActions from '../core/store/list/event-list.actions';
import { ListState } from '../core/store/list/event-list.reducer';
import { ICategory, IEvent, ILocation } from '../core/models';
import { FiltersService } from '../core/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit, OnDestroy {

  events$: Observable<Array<IEvent>>;
  locations$: Observable<Array<ILocation>>;
  categories$: Observable<Array<ICategory>>;
  loading$: Observable<Boolean>;

  constructor(private store: Store<ListState>,
              private filters: FiltersService) {
  }

  ngOnInit() {
    this.locations$ = this.filters.locations;
    this.categories$ = this.filters.categories;

    this.events$ = this.store.select('list', 'data');
    this.loading$ = this.store.select('list', 'loading');
    this.store.dispatch(new listActions.GetEvents());
  }

  ngOnDestroy() {
    this.store.dispatch(new listActions.ClearState());
  }

  onFilter(filters) {
    this.store.dispatch(new listActions.FilterEevnts(filters));
  }
}
