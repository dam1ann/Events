import * as eventListActions from './event-list.actions';
import { FetchError, FetchSuccess, FILTER_EVENTS, FilterEevnts, GET_EVENTS, GetEvents } from './event-list.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { EventsService } from '../../services';
import { tap } from 'rxjs/internal/operators/tap';

export type Action = eventListActions.All;

@Injectable()
export class EventListEffects {

  @Effect()
  getEvents: Observable<Action> = this.actions.pipe(
    ofType(GET_EVENTS),
    switchMap(() => this.events.events$),
    map(data => new FetchSuccess(data)),
    delay(300),
    catchError(err => of(new FetchError({error: err.message})))
  );

  @Effect()
  filterEvents: Observable<Action> = this.actions.pipe(
    ofType(FILTER_EVENTS),
    map((action: FilterEevnts) => action.payload),
    tap(filters => this.events.filter(filters)),
    map(() => new GetEvents()),
    catchError(err => of(new FetchError({error: err.message})))
  );

  constructor(private actions: Actions,
              private events: EventsService) {
  }

}

