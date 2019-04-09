import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { from, Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IEvent } from '../models';

@Injectable()
export class EventsService {

  private events: AngularFirestoreCollection;

  constructor(private afs: AngularFirestore) {
    this.events = afs.collection<IEvent>('events');
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


  checkData(data): Observable<any> {
    return of(true);
  }

  create([, eventData]): Observable<DocumentReference> {
    const {title} = <IEvent>eventData;

    return this.titleNotExist(title).pipe(
      switchMap(correct => {
        return !correct ? throwError('Event exist') : from(this.events.add(eventData));
      })
    );
  }
}
