import * as eventCreatorActions from './event-creator.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEvent } from '../../models/event.interface';

export type Action = eventCreatorActions.All;

@Injectable()
export class EventCreatorEffects {

  constructor(private actions: Actions,
              private afs: AngularFirestore) {
  }

  @Effect()
  checkName: Observable<Action> = this.actions.pipe(
    ofType(eventCreatorActions.CHECK_NAME),
    map((action: eventCreatorActions.CheckName) => action.payload),
    switchMap(({title}: IEvent) => from(this._checkTitle(title))),
    map(() => new eventCreatorActions.NameValid()),
    catchError(err => of(new eventCreatorActions.NameError({error: err.message})))
  );


  @Effect()
  checkMoreInfo: Observable<Action> = this.actions.pipe(
    ofType(eventCreatorActions.CHECK_MORE_INFO),
    map((action: eventCreatorActions.CheckMoreInfo) => action.payload),
    switchMap((data) => from(this._checkMoreInfo(data))),
    map(() => new eventCreatorActions.SecondStepSuccess()),
    catchError(err => of(new eventCreatorActions.SecondStepError({error: err.message})))
  );


  private _checkMoreInfo(data): Observable<any> {
    console.log(data);
    return of(true);
  }

  private _checkTitle(title = ''): Observable<any> {
    const collection = this.afs.collection('events', ref => ref.where('name', '==', title));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      })),
      switchMap(data => !!data.length ? throwError({message: 'Title exist'}) : of(true))
    );
  }
}
