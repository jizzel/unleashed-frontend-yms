import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {AuthResponse, LoginRequest, Tokens, User} from '../../../../core/models/auth.interface';
import {ApiError} from '../../../../core/models/error.interface';
import {State} from '../reducers/auth.reducer';

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    'Load Auths': emptyProps(),
    'Load Auths Success': props<{ data: unknown }>(),
    'Load Auths Failure': props<{ error: unknown }>(),

    'Login Request': props<{ credentials: LoginRequest }>(),
    'Login Success': props<{ response: AuthResponse }>(),
    'Login Failure': props<{ error: ApiError }>(),

    'Refresh Token Request': props<{ token: string }>(),
    'Refresh Token Success': props<{ response: AuthResponse }>(),
    'Refresh Token Failure': props<{ error: ApiError }>(),

    'Logout Request': emptyProps(),
    'Logout Success': emptyProps(),
    'Logout Failure': props<{ error: ApiError }>(),

    // Update User
    'Update User Info': props<{ user: Partial<User> }>(),
    'Update User Success': props<{ user: User }>(),
    'Update User Failure': props<{ error: ApiError }>(),

    // Navigation
    'Set Return URL': props<{ url: string }>(),

    'Clear Error': emptyProps(),
    'Reset Login Attempts': emptyProps(),

    // hydrate state
    'hydrate AuthState': emptyProps(),
    'hydrate AuthState Success': props<{ user: User, tokens: Tokens }>(),
    'hydrate AuthState Failure': emptyProps(),

    // Clear State
    'Clear AuthState': emptyProps()
  }
});
