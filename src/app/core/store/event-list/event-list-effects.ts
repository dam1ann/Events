import * as eventListActions from './event-list.actions';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, delay, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEvent } from '../../models/event.interface';
import * as firebase from 'firebase';

export type Action = eventListActions.All;

@Injectable()
export class EventListEffects {

  private readonly events: Observable<Array<IEvent>>;
  private readonly categoryFilter$: BehaviorSubject<Array<string>>;
  private readonly locationFilter$: BehaviorSubject<Array<string>>;

  constructor(private actions: Actions,
              private afs: AngularFirestore) {

    this.categoryFilter$ = new BehaviorSubject([]);
    this.locationFilter$ = new BehaviorSubject([]);
    this.events = this._getEvents();
  }

  @Effect()
  getEvents: Observable<Action> = this.actions.pipe(
    ofType(eventListActions.GET_EVENTS),
    map((action: eventListActions.GetEvents) => action.payload),
    switchMap(() => this.events),
    map(data => new eventListActions.FetchSuccess(data)),
    delay(300),
    catchError(err => of(new eventListActions.FetchError({error: err.message})))
  );

  @Effect()
  filterEvents: Observable<Action> = this.actions.pipe(
    ofType(eventListActions.FILTER_EVENTS),
    map((action: eventListActions.FilterEevnts) => action.payload),
    switchMap((filters) => this._filterEvents(filters)),
    map(() => new eventListActions.GetEvents()),
    catchError(err => of(new eventListActions.FetchError({error: err.message})))
  );


  private _getEvents(): Observable<Array<IEvent>> {
    return combineLatest(this.categoryFilter$, this.locationFilter$).pipe(
      switchMap(([categories, locations]) => this.afs.collection('events', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

        if (categories.length) {
          categories.forEach(category => {
            query = query.where('category', '==', category);
          });
        }

        if (locations.length) {
          locations.forEach(location => {
            query = query.where('location', '==', location);
          });
        }
        return query;
      }).valueChanges())
    );
  }

  private _filterEvents({locations, categories}): Observable<any> {

    if (locations) {
      this.locationFilter$.next(locations);
    }

    if (categories) {
      this.categoryFilter$.next(categories);
    }
    return of(true);
  }


}

