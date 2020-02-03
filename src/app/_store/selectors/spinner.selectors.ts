import { createSelector } from '@ngrx/store';

import { State } from '../reducers';

export const selectSpinner = (state: State) => state.spinner;

export const getIsLoading = createSelector(
  selectSpinner,
  state => state.loading > 0
);
