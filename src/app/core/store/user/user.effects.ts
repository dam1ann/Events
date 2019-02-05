import * as userActions from './user.actions';
import { from, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { User } from '../../models/user.interface';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

export type Action = userActions.All;

@Injectable()
export class UserEffects {
  constructor(private actions: Actions, private afAuth: AngularFireAuth) {

  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(
    ofType(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState),
    // delay(2000),
    map(authData => {
      if (authData) {
        const user = new User(authData.uid, authData.displayName);
        return new userActions.Authenticated(user);
      } else {
        return new userActions.NotAuthenticated();
      }
    }),
    catchError(err => of(new userActions.AuthError({error: err.message})))
  );


  @Effect()
  googleLogin: Observable<Action> = this.actions.pipe(
    ofType(userActions.GOOGLE_LOGIN),
    map((action: userActions.GoogleLogin) => action.payload),
    switchMap(payload => from(this._googleLogin())),
    // successful login
    map(credential => new userActions.GetUser()),
    catchError(err => of(new userActions.AuthError({error: err.message})))
  );


  facebookLogin: Observable<Action> = this.actions.pipe(
    ofType(userActions.FACEBOOK_LOGIN),
    map((action: userActions.FacebookLogin) => action.payload),
    switchMap(payload => from(this._facebookLogin())),
    map(credential => new userActions.GetUser()),
    catchError(err => of(new userActions.AuthError({error: err.message})))
  );


  @Effect()
  logout: Observable<Action> = this.actions.pipe(
    ofType(userActions.LOGOUT),
    map((action: userActions.Logout) => action.payload),
    switchMap(payload => of(this.afAuth.auth.signOut())),
    map(authData => new userActions.NotAuthenticated()),
    catchError(err => of(new userActions.AuthError({error: err.message})))
  );


  private _googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private _facebookLogin(): Promise<any> {
    const provier = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provier);
  }
}
