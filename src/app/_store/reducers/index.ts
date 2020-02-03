import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { spinnerReducers, SpinnerState } from './spinner.reducers';


export interface State {
  spinner: SpinnerState
}

export const reducers: ActionReducerMap<State> = {
  spinner: spinnerReducers
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
