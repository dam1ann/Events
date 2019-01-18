import * as userActions from './user.actions';
import { Observable, of } from 'rxjs';
import { catchError, delay, map, switchMap } from 'rxjs/operators';

import { AngularFireAuth } from '@angular/fire/auth';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { User } from '../../models/user.interface';
import * as firebase from 'firebase';
import { Action } from '@ngrx/store';


// export type Action = userActions.All;

export class UserEffects {
  constructor(private actions: Actions, private afAuth: AngularFireAuth) {

  }

  @Effect()
  getUser: Observable<Action> = this.actions.pipe(
    ofType(userActions.GET_USER),
    map((action: userActions.GetUser) => action.payload),
    switchMap(payload => this.afAuth.authState),
    delay(2000),
    map(authData => {
      if (authData) {
        const user = new User(authData.uid, authData.displayName);
        return new userActions.Authenticated(user);
      } else {
        return new userActions.NotAuthenticated();
      }
    }),
    catchError(err => of(new userActions.AuthError()))
  );


  @Effect()
  login: Observable<Action> = this.actions.pipe(
    ofType(userActions.GOOGLE_LOGIN),
    map((action: userActions.GoogleLogin) => action.payload),switchMap(payload => {
      return Observable.fromPromise(this.googleLogin());
    }),
    map(credential => {
      // successful login
      return new userActions.GetUser();
    }),
    catch(err => {
      return Observable.of(new userActions.AuthError({error: err.message}))
    })
);


  private googleLogin(): firebase.Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
