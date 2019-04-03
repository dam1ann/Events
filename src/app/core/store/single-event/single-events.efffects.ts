import * as singleEventActions from './single-event.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { IEvent } from '../../models/event.interface';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';

export type Action = singleEventActions.All;

@Injectable()
export class SingleEventsEffects {

  constructor(private actions: Actions) {

  }

  @Effect()
  getEvent: Observable<IEvent> = this.actions.pipe(
    ofType(singleEventActions.GET_EVENT),
    map((action: singleEventActions.GetEvent) => action.payload),
    map(() => new singleEventActions.FetchSuccess()),
    catchError((err => of(new singleEventActions.FetchError({error: err}))))
  );

}
