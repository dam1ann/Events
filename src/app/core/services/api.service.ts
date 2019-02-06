import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: CoreModule
})
export class ApiService {

  constructor(private afs: AngularFirestore) {

  }

  getCategories(): Observable<any> {
    const collection = this.afs.collection('categories');

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
  }


  getLocations(): Observable<any> {
    const collection = this.afs.collection('locations');

    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a => a.payload.doc.data()))
    );
  }


}
