import { Action, createReducer, on } from '@ngrx/store';
import { responseLoginSuccess } from '../actions/auth.actions';


export const authFeatureKey = 'auth';

export interface AuthStateInterface {
  email: string;
  expiresIn: number;
  token: string;
  userId: string;
}

export const initialState: AuthStateInterface = {
  email: '',
  expiresIn: 0,
  token: '',
  userId: '',
};

const _authReducer = createReducer(
  initialState,
  on(responseLoginSuccess, (state, { email, expiresIn, token, userId }) =>
    ({ ...state, email, expiresIn, token, userId }))
);

export function authReducer(state: AuthStateInterface | undefined, action: Action) {
  return _authReducer(state, action);
}
