import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthActions } from '../actions/auth.actions';
import {AuthResponse} from '../../../../core/models/auth.interface';
import {ApiError} from '../../../../core/models/error.interface';

export const authFeatureKey = 'auth';

export interface State {
  user: AuthResponse['user'] | null;
  tokens: AuthResponse['token'] | null;
  loading: boolean;
  error: ApiError | null;
  returnUrl: string | null;
  lastLogin: Date | null;
  loginAttempts: number;
}

export const initialState: State = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
  returnUrl: null,
  lastLogin: null,
  loginAttempts: 0
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadAuths, state => state),
  on(AuthActions.loadAuthsSuccess, (state, action) => state),
  on(AuthActions.loadAuthsFailure, (state, action) => state),

  // Login
  on(AuthActions.loginRequest, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: response.user,
    tokens: response.token,
    loading: false,
    error: null
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Refresh Token
  on(AuthActions.refreshTokenRequest, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.refreshTokenSuccess, (state, { response }) => ({
    ...state,
    tokens: response.token,
    loading: false,
    error: null
  })),

  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Logout
  on(AuthActions.logoutRequest, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.logoutSuccess, () => ({
    ...initialState
  })),

  on(AuthActions.logoutFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Update User
  on(AuthActions.updateUserInfo, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loading: false,
    error: null
  })),

  on(AuthActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Navigation
  on(AuthActions.setReturnURL, (state, { url }) => ({
    ...state,
    returnUrl: url
  })),

  // Clear Error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null,
  })),

  on(AuthActions.resetLoginAttempts, (state) => ({
    ...state,
    loginAttempts: 0
  })),

  // hydrate state
  on(AuthActions.hydrateAuthState, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(AuthActions.hydrateAuthStateSuccess, (state, {user, tokens}) => ({
    ...state,
    user,
    tokens,
    loading: false,
  })),
  on(AuthActions.clearAuthState, () => ({
    ...initialState,
  })),
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});

