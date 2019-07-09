import * as eventCreatorActions from './creator.actions';
import {
  CHECK_MORE_INFO,
  CHECK_NAME,
  CheckMoreInfo,
  CheckName,
  CREATE_EVENT,
  CreateEventSuccess,
  HttpError,
  NameValid,
  SecondStepSuccess
} from './creator.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { CreatorState } from './creator.reducer';
import { EventsService, NavigationService } from '../../services';
import { IEvent } from '../../models';
import { tap } from 'rxjs/internal/operators/tap';

export type Action = eventCreatorActions.All;

@Injectable()
export class CreatorEffects {

  constructor(private actions: Actions,
              private store: Store<CreatorState>,
              private toastr: ToastrService,
              private events: EventsService,
              private navigation: NavigationService) {
  }

  @Effect()
  checkName$: Observable<Action> = this.actions.pipe(
    ofType(CHECK_NAME),
    map((action: CheckName) => action.payload),
    switchMap(({title}: IEvent) => this.events.titleNotExist(title)),
    switchMap(() => this.navigation.to('second')),
    map(() => new NameValid()),
    catchError(err => this._handleError(err))
  );


  @Effect()
  checkMoreInfo$: Observable<Action> = this.actions.pipe(
    ofType(CHECK_MORE_INFO),
    map((action: CheckMoreInfo) => action.payload),
    switchMap((data) => this.events.titleNotExist(data)),
    switchMap(() => this.navigation.to('third')),
    map(() => new SecondStepSuccess()),
    catchError(err => this._handleError(err))
  );


  @Effect()
  createEvent$: Observable<Action> = this.actions.pipe(
    ofType(CREATE_EVENT),
    withLatestFrom(this.store.select('creatorState', 'event')),
    mergeMap(eventData => this.events.create(eventData)),
    tap(() => this._handleSuccess('event created')),
    map(() => new CreateEventSuccess()),
    catchError(err => this._handleError(err))
  );


  private _handleError({message}): Observable<Action> {
    console.error(message);
    this.toastr.error('Event creation error :/ Please try again', 'Error');
    return of(new HttpError({error: message}));
  }

  private _handleSuccess(message: string) {
    this.toastr.success(message, 'Event created :)');
  }
}
