import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FiltersService } from '../core/services';
import { Observable } from 'rxjs';
import { ICategory, IEvent } from '../core/models';
import { ListState } from '../core/store/list/event-list.reducer';
import { Store } from '@ngrx/store';
import * as listActions from '../core/store/list/event-list.actions';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  categories$: Observable<Array<ICategory>>;
  events$: Observable<Array<IEvent>>;
  loading$: Observable<Boolean>;

  constructor(private filters: FiltersService,
              private store: Store<ListState>) {
  }

  ngOnInit() {
    this.categories$ = this.filters.categories;

    this.loading$ = this.store.select('list', 'loading');
    this.events$ = this.store.select('list', 'data').pipe(tap(data => {
      console.log(data);
    }));

    this.store.dispatch(new listActions.GetEvents());
  }

  ngOnDestroy() {
    this.store.dispatch(new listActions.ClearState());
  }
}
