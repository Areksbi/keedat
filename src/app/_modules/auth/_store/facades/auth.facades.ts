import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

import { getEmail, getIsAuth, getUserId } from '../selectors/auth.selectors';
import { setAuthDataFromStorage } from '../actions/auth.actions';
import { State } from '../../../../_store/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(
    private store: Store<State>
  ) { }

  public getEmail(): Observable<string> {
    return this.store.pipe(
      select(getEmail),
    )
  }

  public getUserId(): Observable<string> {
    return this.store.pipe(
      select(getUserId),
    )
  }

  public getIsAuth(): Observable<boolean> {
    return this.store.pipe(
      select(getIsAuth),
      switchMap((isAuth: boolean) => of(isAuth || this.getIsAuthFromStorage()))
    );
  }

  private getIsAuthFromStorage(): boolean {
    // const authData = this.authService.getAuthData();
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');

    // TODO: move in effect --> this.store.dispatch(getAuthDataFromStorage());
    this.store.dispatch(setAuthDataFromStorage({ userId, token, expirationDate, email }));
    return Boolean(token);
  }
}
