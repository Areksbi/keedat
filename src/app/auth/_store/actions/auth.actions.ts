import { createAction, props } from '@ngrx/store';

import { AuthStateInterface } from '../reducers/auth.reducers';
import { RequestLoginActionInterface } from '../../_interfaces/auth-actions.interface';
import { ResponseLoginInterface } from '../../_interfaces/auth.interface';
import { RequestUpdateAccount, ResponseUpdateAccount } from '../../../account/_interfaces/account.interface';

export const requestLogin = createAction(
  '[Auth] Login Request',
  props<RequestLoginActionInterface>()
);

export const responseLoginSuccess = createAction(
  '[Auth] Login Response Success',
  props<ResponseLoginInterface>()
);

export const responseLoginError = createAction(
  '[Auth] Login Response Error',
);

export const getAuthDataFromStorage = createAction(
  '[Auth] Get Data From Storage',
);

export const setAuthDataFromStorage = createAction(
  '[Auth] Set Data From Storage',
  props<AuthStateInterface>()
);

export const logout = createAction(
  '[Auth] Logout',
);

export const requestUpdateUser = createAction(
  '[User] Update User Request',
  props<{id: string, body: RequestUpdateAccount}>()
);

export const responseUpdateUserSuccess = createAction(
  '[User] Update User Response Success',
  props<ResponseUpdateAccount>()
);

export const responseUpdateUserError = createAction(
  '[User] Update User Response Error',
);
