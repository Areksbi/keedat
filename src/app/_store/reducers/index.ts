import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { authReducers, AuthStateInterface } from '../../_modules/auth/_store/reducers/auth.reducers';
import { environment } from '../../../environments/environment';
import { spinnerReducers, SpinnerStateInterface } from './spinner.reducers';

export interface State {
  auth: AuthStateInterface
  spinner: SpinnerStateInterface
}

export const reducers: ActionReducerMap<State> = {
  auth: authReducers,
  spinner: spinnerReducers
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
