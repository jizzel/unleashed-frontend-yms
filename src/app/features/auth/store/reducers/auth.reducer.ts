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
}

export const initialState: State = {
  user: null,
  tokens: null,
  loading: false,
  error: null
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

  // Clear Error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);

export const authFeature = createFeature({
  name: authFeatureKey,
  reducer,
});

