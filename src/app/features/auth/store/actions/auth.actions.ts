import { createActionGroup, emptyProps, props } from '@ngrx/store';
import {AuthResponse, LoginRequest} from '../../../../core/models/auth.interface';
import {ApiError} from '../../../../core/models/error.interface';

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

    'Clear Error': emptyProps(),
  }
});
