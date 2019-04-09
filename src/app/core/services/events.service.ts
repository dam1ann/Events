import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { BehaviorSubject, combineLatest, from, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';
import { IEvent } from '../models';


@Injectable()
export class EventsService {

  readonly events$: Observable<Array<IEvent>>;
  private readonly categoryFilter$: BehaviorSubject<Array<string>>;
  private readonly locationFilter$: BehaviorSubject<Array<string>>;

  constructor(private afs: AngularFirestore) {
    this.categoryFilter$ = new BehaviorSubject([]);
    this.locationFilter$ = new BehaviorSubject([]);
    this.events$ = this.read();
  }


  create([, eventData]): Observable<DocumentReference> {
    const {title} = <IEvent>eventData;
    const collections = this.afs.collection<IEvent>('events');

    return this.titleNotExist(title).pipe(
      switchMap(correct => {
        return correct ? from(collections.add(eventData)) : throwError('Event exist');
      })
    );
  }


  read(): Observable<Array<IEvent>> {
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


  update(): Observable<boolean> {
    return of(true);
  }


  delete(): Observable<boolean> {
    return of(true);
  }


  filter({locations, categories}) {
    if (locations) {
      this.locationFilter$.next(locations);
    }

    if (categories) {
      this.categoryFilter$.next(categories);
    }
  }


  titleNotExist(title = ''): Observable<boolean> {
    const collection = this.afs.collection<IEvent>('events', ref => ref.where('title', '==', title));

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return {id, ...data};
      })),
      switchMap(data => {
        if (!!data.length) {
          return throwError({message: `Event ${title} exist`});
        }
        return of(true);
      })
    );
  }
}
