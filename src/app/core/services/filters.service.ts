import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICategory, ILocation } from '../models';


@Injectable()
export class FiltersService {

  private readonly _locations$: BehaviorSubject<Array<ILocation>>;
  private readonly _categories$: BehaviorSubject<Array<ICategory>>;

  get locations() {
    return this._locations$ as Observable<Array<ILocation>>;
  }

  get categories() {
    return this._categories$ as Observable<Array<ICategory>>;
  }

  constructor(private afs: AngularFirestore) {
    this._locations$ = new BehaviorSubject([]);
    this._categories$ = new BehaviorSubject([]);

    this.afs.collection('locations').valueChanges().subscribe(this._locations$);
    this.afs.collection('categories').valueChanges().subscribe(this._categories$);
  }
}
