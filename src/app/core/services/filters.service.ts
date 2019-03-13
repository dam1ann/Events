import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ILocation } from '../models/location.interface';
import { ICategory } from '../models/category.interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  readonly _locations$: Observable<Array<ILocation>>;
  readonly _categories$: Observable<Array<ICategory>>;

  get locations() {
    return this._locations$;
  }

  get categories() {
    return this._categories$;
  }

  constructor(private afs: AngularFirestore) {
    const locationsCollection: AngularFirestoreCollection<ILocation> = this.afs.collection('locations');
    const categoriesCollection: AngularFirestoreCollection<ICategory> = this.afs.collection('categories');

    this._locations$ = locationsCollection.valueChanges();
    this._categories$ = categoriesCollection.valueChanges();
  }

  getCategory(name): Observable<Array<ICategory>> {
    const collection: AngularFirestoreCollection<ICategory> = this.afs.collection('categories');
    return collection.snapshotChanges().pipe(
      map(actions => actions.map(a =>
        a.payload.doc.data() as ICategory)
      )
    );
  }
}
