import * as eventCreatorActions from './event-creator.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export type Action = eventCreatorActions.All;

@Injectable()
export class EventCreatorEffects {

  constructor(private actions: Actions) {
  }

  @Effect()
  create: Observable<Action> = this.actions.pipe(
    ofType(eventCreatorActions.CREATE),
    map((acion: eventCreatorActions.Create) => acion.payload)
  );
}
