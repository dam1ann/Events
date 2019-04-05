import * as singleEventActions from './single-event.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { IEvent } from '../../models/event.interface';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { AngularFirestore } from '@angular/fire/firestore';

export type Action = singleEventActions.All;

@Injectable()
export class SingleEventsEffects {

  constructor(private actions: Actions,
              private afs: AngularFirestore) {
  }

  @Effect()
  getEvent: Observable<IEvent> = this.actions.pipe(
    ofType(singleEventActions.GET_EVENT),
    map((action: singleEventActions.GetEvent) => action.payload),
    switchMap(title => this._getEvent(title)),
    map((event) => new singleEventActions.FetchSuccess(event)),
    catchError((err => of(new singleEventActions.FetchError({error: err}))))
  );

  private _getEvent(title): Observable<any> {
    return this.afs.collection('events', ref => ref.where('title', '==', title)).valueChanges();
  }

}
