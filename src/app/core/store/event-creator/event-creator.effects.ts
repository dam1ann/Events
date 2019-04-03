import * as eventCreatorActions from './event-creator.actions';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { IEvent } from '../../models/event.interface';

export type Action = eventCreatorActions.All;

@Injectable()
export class EventCreatorEffects {

  eventsRef: any;

  constructor(private actions: Actions,
              private store: Store<any>,
              private router: Router,
              private route: ActivatedRoute,
              private afs: AngularFirestore) {

    this.eventsRef = afs.collection<IEvent>('events');
  }

  @Effect()
  checkName: Observable<Action> = this.actions.pipe(
    ofType(eventCreatorActions.CHECK_NAME),
    map((action: eventCreatorActions.CheckName) => action.payload),
    switchMap(({title}: IEvent) => this._correctEventTitle(title)),
    switchMap(() => this._navigate('second')),
    map(() => new eventCreatorActions.NameValid()),
    catchError(err => of(new eventCreatorActions.NameError({error: err.message})))
  );


  @Effect()
  checkMoreInfo: Observable<Action> = this.actions.pipe(
    ofType(eventCreatorActions.CHECK_MORE_INFO),
    map((action: eventCreatorActions.CheckMoreInfo) => action.payload),
    switchMap((data) => this._checkMoreInfo(data)),
    switchMap(() => this._navigate('third')),
    map(() => new eventCreatorActions.SecondStepSuccess()),
    catchError(err => of(new eventCreatorActions.SecondStepError({error: err.message})))
  );


  @Effect()
  createEvent: Observable<Action> = this.actions.pipe(
    ofType(eventCreatorActions.CREATE_EVENT),
    withLatestFrom(this.store.select('creatorState', 'event')),
    mergeMap(data => this._createEvent(data)),
    map(() => new eventCreatorActions.CreateEventSuccess()),
    catchError(err => of(new eventCreatorActions.CreateEventError({error: err.message})))
  );


  private _checkMoreInfo(data): Observable<any> {
    console.log(data);
    return of(true);
  }

  private _correctEventTitle(title = ''): Observable<any> {
    const collection = this.afs.collection<IEvent>('events', ref => ref.where('title', '==', title));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      })),
      switchMap(data => {
        if (!!data.length) {
          return throwError({message: 'Title exist'});
        }
        return of(true);
      })
    );
  }

  private _createEvent(data): Observable<any> {

    const event: IEvent = <IEvent>data[1];

    return this._correctEventTitle(event.title).pipe(
      map(correct => {
        if (!correct) {
          return throwError('Event exist');
        }

        this.eventsRef.add(event);
        return true;
      })
    );
  }

  private _navigate(path: string): Observable<any> {

    const url = this.router.routerState.snapshot.url;
    const newUrl = url.substring(0, url.lastIndexOf('/'));
    return of(this.router.navigate([`${newUrl}/${path}`]));
  }
}
