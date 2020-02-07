import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';
import { requestLogin, responseLoginError, responseLoginSuccess } from '../actions/auth.actions';
import { RequestLoginActionInterface } from '../../_interfaces/auth-actions.interface';
import { ResponseLoginInterface } from '../../_interfaces/auth.interface';

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
  ) {}

  @Effect()
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(requestLogin),
      exhaustMap((action) => {
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
}
