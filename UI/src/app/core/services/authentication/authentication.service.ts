import {Injectable} from '@angular/core';
import {User} from 'firebase';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs/internal/Observable';
import {LocalStorageKey} from '../../enums/local-storage-key';
import UserCredential = firebase.auth.UserCredential;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  public readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) {
  }

  public login(email: string, password: string): Promise<UserCredential> {
    return this.fireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public logout(): void {
    this.fireAuth.auth.signOut().then(() => {
      localStorage.setItem(LocalStorageKey.AuthToken, null);
    });
  }
}
