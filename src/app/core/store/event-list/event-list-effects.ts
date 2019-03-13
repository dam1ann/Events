import * as eventListActions from './event-list.actions';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { IEvent } from '../../models/event.interface';
import 'firebase';

export type Action = eventListActions.All;

@Injectable()
export class EventListEffects {

  private eventsCollection: AngularFirestoreCollection<IEvent>;
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
      switchMap(([category, location]) => afs.collection('events', ref => {
        let query: firebase.firestore.CollectionReference | firebase.firestore.Query = ref;

        if (category) {
          query = query.where('category', '==', category[0]);
        }

        if (location) {
          query = query.where('location', '==', location[0]);
        }
        console.log(query);
        return query;
      }).valueChanges())
    );

    // this.eventsCollection = this.afs.collection('events');
    // this.events = this.eventsCollection.valueChanges();
  }

  @Effect()
  getEvents: Observable<Action> = this.actions.pipe(
    ofType(eventListActions.GET_EVENTS),
    map((action: eventListActions.GetEvents) => action.payload),
    switchMap(() => this._getEvents()),
    map(data => new eventListActions.FetchSuccess(data)),
    catchError(err => of(new eventListActions.FetchError({error: err.message})))
  );


  private _getEvents(): Observable<Array<IEvent>> {
    return this.events;
  }

  private filterByCategory(category) {

  }

  private filterByLocation(location) {

  }


}

