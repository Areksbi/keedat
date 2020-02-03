import { Action, createReducer, on } from '@ngrx/store';

import { hideSpinner, showSpinner } from '../actions';

export interface SpinnerState {
  loading: number;
}

export const initialState: SpinnerState = {
  loading: 0,
};

const _spinnerReducers = createReducer(
  initialState,
  on(hideSpinner, state => ({ ...state, loading: state.loading - 1 })),
  on(showSpinner, state => ({ ...state, loading: state.loading + 1 })),
);

export function spinnerReducers(state: SpinnerState | undefined, action: Action) {
  return _spinnerReducers(state, action);
}
