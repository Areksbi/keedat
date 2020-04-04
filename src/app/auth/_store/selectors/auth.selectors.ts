import { createSelector } from '@ngrx/store';

import { State } from '../../../_store/reducers';


export const selectAuth = (state: State) => state.auth;

export const getEmail = createSelector(
  selectAuth,
  state => state.email
);

export const getIsAuth = createSelector(
  selectAuth,
  state => Boolean(state.token)
);

export const getUserId = createSelector(
  selectAuth,
  state => state.userId
);
