import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
// import firebase = require('firebase');

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  private userEmail = '';
  private shortName = '';
  private uid = '';

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private uiService: UIService,
    private afs: AngularFirestore
  ) {}

  // call initAuthListener() in app.component when application starts
  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.isAuthenticated = true;
        this.uid = user.uid;
        console.log('uid: ' + this.uid);
        this.authChange.next(true);
        this.router.navigate(['/scorecard']);
      } else {
        // TODO cancel fb subscriptions in other services
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(['/scorecard']);
      }
    });
  }

  registerUser(authData: User) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${result.user.uid}`);
        const userData = {
          uid: result.user.uid,
          email: result.user.email,
          shortName: authData.shortName
        };
        userRef.set(userData);
        this.userEmail = authData.email;
        this.shortName = authData.shortName;
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('New Account Created', null, 5000);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.userEmail = authData.email;
        this.uid = result.user.uid;
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Login Successful', null, 5000);
      })
      .catch(error => {
        this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar(error.message, null, 5000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.uid = '';
    this.uiService.showSnackbar('Logged Out', null, 5000);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  getUserEmail() {
    return this.userEmail;
  }

  getUserShortName() {
    return this.shortName;
  }

  getUID() {
    return this.uid;
  }
}
