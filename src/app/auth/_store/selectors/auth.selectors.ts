import { createSelector } from '@ngrx/store';

import { State } from '../../../_store/reducers';


export const selectAuth = (state: State) => state.auth;

export const getIsAuth = createSelector(
  selectAuth,
  state => Boolean(state.token)
);
