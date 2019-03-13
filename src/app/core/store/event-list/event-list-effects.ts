import * as eventListActions from './event-list.actions';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { IEvent } from '../../models/event.interface';
import * as firebase from 'firebase';

export type Action = eventListActions.All;

@Injectable()
export class EventListEffects {

  events: Observable<Array<IEvent>>;
  categoryFilter$: BehaviorSubject<Array<string>>;
  locationFilter$: BehaviorSubject<Array<string>>;

  constructor(private actions: Actions,
              private afs: AngularFirestore) {

    this.categoryFilter$ = new BehaviorSubject([]);
    this.locationFilter$ = new BehaviorSubject([]);

    this.events = combineLatest(
      this.categoryFilter$,
      this.locationFilter$
    ).pipe(
      switchMap(([categories, locations]) => afs.collection('events', ref => {
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

  @Effect()
  getEvents: Observable<Action> = this.actions.pipe(
    ofType(eventListActions.GET_EVENTS),
    map((action: eventListActions.GetEvents) => action.payload),
    switchMap(() => this._getEvents()),
    map(data => new eventListActions.FetchSuccess(data)),
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
    return this.events;
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

