import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as listActions from '../core/store/event-list/event-list.actions';
import { FiltersService } from '../core/services/filters.service';
import { ListState } from '../core/store/event-list/event-list.reducer';
import { ILocation } from '../core/models/location.interface';
import { ICategory } from '../core/models/category.interface';
import { IEvent } from '../core/models/event.interface';

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


  constructor(private store: Store<ListState>,
              private filters: FiltersService) {
  }

  ngOnInit() {
    this.locations$ = this.filters.locations;
    this.categories$ = this.filters.categories;

    this.events$ = this.store.select('listState', 'list');
    this.store.dispatch(new listActions.GetEvents());
  }

  ngOnDestroy() {
    this.store.dispatch(new listActions.ClearState());
  }

  onFilter(filters) {
    this.store.dispatch(new listActions.FilterEevnts(filters));
  }
}
