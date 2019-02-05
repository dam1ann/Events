import * as eventCreatorActions from './event-creator.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

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
    switchMap(({name}) => from(this._checkName(name))),
    map(() => new eventCreatorActions.NameValid()),
    catchError(err => of(new eventCreatorActions.NameError({error: err.message})))
  );

  private _checkName(name): Observable<any> {
    const coll = this.afs.collection('events', ref => ref.where('name', '==', name));

    return coll.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      })),
      tap(data => {
        console.log(data);
      }),
      switchMap(data => !!data.length ? throwError('Name exist') : of(true))
    );
  }
}
