import { Action, createReducer, on } from '@ngrx/store';

import { hideSpinner, showSpinner } from '../actions';

export interface SpinnerStateInterface {
  loading: number;
}

export const initialState: SpinnerStateInterface = {
  loading: 0,
};

const _spinnerReducers = createReducer(
  initialState,
  on(hideSpinner, state => ({ ...state, loading: state.loading - 1 })),
  on(showSpinner, state => ({ ...state, loading: state.loading + 1 })),
);

export function spinnerReducers(state: SpinnerStateInterface | undefined, action: Action) {
  return _spinnerReducers(state, action);
}
