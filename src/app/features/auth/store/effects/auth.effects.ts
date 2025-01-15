import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, exhaustMap, tap} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';
import { AuthService } from '../../../../core/services/auth.service';
import {Router} from '@angular/router';


@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}


  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginRequest),
    exhaustMap(({ credentials }) =>
      this.authService.login(credentials).pipe(
        map(response => {
          this.authService.setTokens(response);
          return AuthActions.loginSuccess({ response });
        }),
        catchError(error => of(AuthActions.loginFailure({ error })))
      )
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(() => this.router.navigate(['/admin/dashboard']))
  ), { dispatch: false });

  refreshToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.refreshTokenRequest),
    exhaustMap(({ token }) =>
      this.authService.refreshToken(token).pipe(
        map(response => {
          this.authService.setTokens(response);
          return AuthActions.refreshTokenSuccess({ response });
        }),
        catchError(error => of(AuthActions.refreshTokenFailure({ error })))
      )
    )
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logoutRequest),
    map(() => {
      this.authService.logout();
      this.authService.clearTokens();
      return AuthActions.logoutSuccess();
    }),
    catchError(error => of(AuthActions.logoutFailure({ error })))
  ));

  logoutSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logoutSuccess),
    tap(() => this.router.navigate(['/login']))
  ), { dispatch: false });
}
