import { Action, createReducer, on } from '@ngrx/store';

import { logout, responseLoginSuccess, setAuthDataFromStorage } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthStateInterface {
  email: string;
  expirationDate: string;
  token: string;
  userId: string;
}

export const initialState: AuthStateInterface = {
  email: '',
  expirationDate: '',
  token: '',
  userId: '',
};

const _authReducers = createReducer(
  initialState,
  on(responseLoginSuccess, (state: AuthStateInterface, { email, expiresIn, token, userId }) => {
    const now = new Date();
    const expiration = new Date(now.getTime() + expiresIn * 1000);
    const expirationDate = expiration.toISOString();
    return { ...state, email, expirationDate, token, userId };
  }),
  on(setAuthDataFromStorage, (state: AuthStateInterface, { email, expirationDate, token, userId }) =>
    ({ ...state, email, expirationDate, token, userId })),
  on(logout, (() => initialState)),
);

export function authReducers(state: AuthStateInterface | undefined, action: Action) {
  return _authReducers(state, action);
}
