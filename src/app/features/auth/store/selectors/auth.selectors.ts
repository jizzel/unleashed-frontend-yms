import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';
import {State} from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state: State) => state.user
);

export const selectTokens = createSelector(
  selectAuthState,
  (state: State) => state.tokens
);

export const selectIsAuthenticated = createSelector(
  selectTokens,
  (tokens) => !!tokens?.access.token
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: State) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: State) => state.error
);
