import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';
import {
  requestLogin,
  requestUpdateUser,
  responseLoginError,
  responseLoginSuccess, responseUpdateUserError,
  responseUpdateUserSuccess,
} from '../actions/auth.actions';
import { RequestLoginActionInterface } from '../../_interfaces/auth-actions.interface';
import { ResponseLoginInterface } from '../../_interfaces/auth.interface';
import { ResponseUpdateAccount } from '../../../account/_interfaces/account.interface';
import { AccountService } from '../../../account/_services/account.service';

@Injectable()
export class AuthEffects {

  constructor(
    private accountService: AccountService,
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogin),
      switchMap((action) => {
        const { email, password, returnUrl }: RequestLoginActionInterface = action;
        return this.authService.login({ email, password })
          .pipe(
            map((response: ResponseLoginInterface) => responseLoginSuccess(response)),
            tap(() => {
              if (returnUrl) this.router.navigate([returnUrl]);
            }),
            catchError(() => responseLoginError)
          )
        }
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestUpdateUser),
      switchMap((action) => {
        const { id, body } = action;
        return this.accountService.updateAccount(id, body)
          .pipe(
            map((response: ResponseUpdateAccount) => {
              const email = response.result && response.result.email;
              if (email) {
                this.authService.setEmailInStorage(email);
              }
              return responseUpdateUserSuccess(response)
            }),
            catchError(() => responseUpdateUserError)
          )
        }
      )
    )
  );

  // @Effect()
  // setFromStorage$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getAuthDataFromStorage),
  //     tap(() => {
  //         const { email, expirationDate, token, userId } = this.authService.getAuthData();
  //         this.store.dispatch(setAuthDataFromStorage({ userId, token, expirationDate, email }));
  //       }
  //     )
  //   )
  // );
}
