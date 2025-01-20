import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, map, exhaustMap, tap, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthActions } from '../actions/auth.actions';
import { AuthService } from '../../../../core/services/auth.service';
import {Router} from '@angular/router';
import {selectAuthState, selectReturnUrl} from '../selectors/auth.selectors';
import {Store} from '@ngrx/store';
import {StorageService} from '../../../../core/services/storage.service';


@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private store = inject(Store);

  constructor(
    private readonly storageService: StorageService,
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
    withLatestFrom(this.store.select(selectReturnUrl)),
    tap(([_, returnUrl]) => {
      const url = returnUrl || '/admin/dashboard';
      this.router.navigate([url]);
    })
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
    tap(() => this.router.navigate(['/auth/login']))
  ), { dispatch: false });

  // hydrate auth state on app init from local storage
  hydrateAuth$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.hydrateAuthState),
    map(() => {
      const token = this.storageService.getAccessToken();
      if (!token) {
        return AuthActions.clearAuthState();
      }
      // const user = this.authService.getCurrentUser();
      const authState = this.storageService.getAuthState();
      return AuthActions.hydrateAuthStateSuccess(authState);
    })
  ));

  // persist auth state to local storage when auth state changes
  persistAuthState$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.loginSuccess,
      AuthActions.refreshTokenSuccess,
    ),
    tap((action) => {
      console.log(action);
      if ('user' in action){
        this.storageService.setUserData(action['user']);
        this.storageService.setAuthState({...action});
      }
      // const state = this.store.select(selectAuthState);
      // this.storageService.setAuthState(state);
    })
  ), { dispatch: false });
}
