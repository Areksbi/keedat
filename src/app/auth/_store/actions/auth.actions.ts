import { createAction, props } from '@ngrx/store';

import { RequestLoginInterface, ResponseLoginInterface } from '../../_interfaces/auth.interface';

export const requestLogin = createAction(
  '[Auth] Login Request',
  props<RequestLoginInterface>()
);

export const responseLoginSuccess = createAction(
  '[Auth] Login Response Success',
  props<ResponseLoginInterface>()
);

export const responseLoginError = createAction(
  '[Auth] Login Response Error',
);
