import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user!: firebase.default.User;
  public isLoading: boolean = false;

  public get isUserLoggedIn(): boolean {
    const user = localStorage.getItem('user')!;
    return Boolean(JSON.parse(user));
  }

  public get isUserLoaded(): boolean {
    return Boolean(this.user);
  }

  constructor(
    private _afAuth: AngularFireAuth,
    private _afStore: AngularFirestore,
    private _router: Router
  ) {
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      }
    });
  }

  public async createUser(user: User): Promise<void> {
    this._startLoading();

    try {
      const result = await this._afAuth.createUserWithEmailAndPassword(
        user.email,
        user.password!
      );

      if (result.user !== null) {
        await this._setUser({
          ...user,
          uid: result.user.uid,
        });
      }

      this._finishLoading();
      this._redirectToDashboard();
    } catch (error) {
      this._finishLoading();
      window.alert(error);
    }
  }

  public async loginUser(user: User): Promise<void> {
    this._startLoading();
    try {
      await this._afAuth.signInWithEmailAndPassword(user.email, user.password!);

      this._finishLoading();
      this._redirectToDashboard();
    } catch (error) {
      this._finishLoading();
      window.alert(error);
    }
  }

  public async logoutUser() {
    this._startLoading();
    try {
      await this._afAuth.signOut();
      this._finishLoading();
      localStorage.removeItem('user');
      this._router.navigate(['login']);
    } catch (error) {
      this._finishLoading();
      window.alert(error);
    }
  }

  private async _setUser(user: User): Promise<void> {
    const userRef = await this._afStore.doc(`users/${user.uid}`);

    const userData: User = {
      uid: user.uid,
      email: user.email,
    };

    return userRef.set(userData, { merge: true });
  }

  private _redirectToDashboard(): void {
    this._afAuth.authState.subscribe((user) => {
      if (user) {
        this._router.navigate(['dashboard']);
      }
    });
  }

  private _startLoading(): void {
    this.isLoading = true;
  }

  private _finishLoading(): void {
    this.isLoading = false;
  }
}
