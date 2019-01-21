import { Injectable } from '@angular/core';
import { CoreModule } from '../core.module';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable({
  providedIn: CoreModule
})
export class AuthService {

  get user() {
    return this.afAuth.user;
  }

  constructor(private afAuth: AngularFireAuth) {
  }

  async login() {
    await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    console.log('login');
  }

  async logout() {
    await this.afAuth.auth.signOut();
  }
}
