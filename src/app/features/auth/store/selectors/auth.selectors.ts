import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectUser = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.user
);

export const selectTokens = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.tokens || null
);

export const selectIsAuthenticated = createSelector(
  selectTokens,
  (tokens) => !!tokens?.access.token || !!localStorage.getItem('accessToken')
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.loading
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.error
);

// User Role and Permissions
export const selectUserRole = createSelector(
  selectUser,
  (user) => user?.role
);

export const selectIsAdmin = createSelector(
  selectUserRole,
  (role) => role === 'ADMIN'
);

// Session and Login Info
export const selectLastLogin = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.lastLogin
);

export const selectLoginAttempts = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.loginAttempts
);

export const selectIsLockedOut = createSelector(
  selectLoginAttempts,
  (attempts) => attempts >= 5 // Lock after 5 failed attempts
);

export const selectReturnUrl = createSelector(
  selectAuthState,
  (state: fromAuth.State) => state.returnUrl
);

// Composite Selectors
export const selectAuthStatus = createSelector(
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
  (isAuthenticated, loading, error) => ({
    isAuthenticated,
    loading,
    error
  })
);

export const selectUserDetails = createSelector(
  selectUser,
  selectLastLogin,
  (user, lastLogin) => ({
    ...user,
    lastLogin
  })
);
