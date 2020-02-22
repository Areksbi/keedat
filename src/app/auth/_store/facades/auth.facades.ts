import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';
import { getIsAuth } from '../selectors/auth.selectors';
import { setAuthDataFromStorage } from '../actions/auth.actions';
import { State } from '../../../_store/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(
    private authService: AuthService,
    private store: Store<State>
  ) { }

  public getIsAuth(): Observable<boolean> {
    return this.store.pipe(
      select(getIsAuth),
      switchMap((isAuth: boolean) => of(isAuth || this.getIsAuthFromStorage()))
    );
  }

  private getIsAuthFromStorage(): boolean {
    const authData = this.authService.getAuthData();
    if (!authData) {
      return;
    }

    const { email, expirationDate, token, userId} = authData;
    // TODO: move in effect --> this.store.dispatch(getAuthDataFromStorage());
    this.store.dispatch(setAuthDataFromStorage({ userId, token, expirationDate, email }));
    return Boolean(token);
  }

}
