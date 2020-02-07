import { Injectable } from '@angular/core';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';
import { requestLogin, responseLoginError, responseLoginSuccess } from '../actions/auth.actions';
import { RequestLoginInterface, ResponseLoginInterface } from '../../_interfaces/auth.interface';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
  ) {}

  @Effect()
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogin),
      exhaustMap((action) => {
          const { email, password }: RequestLoginInterface = action;
          return this.authService.login(email, password)
            .pipe(
              map((response: ResponseLoginInterface) => responseLoginSuccess(response)),
              catchError(() => responseLoginError)
            )
        }
      )
    )
  );
}
