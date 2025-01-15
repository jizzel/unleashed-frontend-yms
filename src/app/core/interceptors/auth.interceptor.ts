import {HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {inject} from '@angular/core';
import {catchError, switchMap} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {AuthResponse} from '../models/auth.interface';

const addTokenToRequest = (request: HttpRequest<any>, accessToken: string): HttpRequest<any> => {
  return request.clone({
    headers: request.headers.set('Authorization', `Bearer ${accessToken}`)
  });
};

const handle401Error = (request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) => {
  const refreshToken = authService.getRefreshToken() || '';

  if(!refreshToken) {
    authService.logout();
    // return throwError(() => error);
    console.log('refreshToken not found');
  }

  return authService.refreshToken(refreshToken).pipe(
    switchMap((response: AuthResponse) => {
      authService.setTokens(response);
      const newAccessToken = response.token.access.token;
      const clonedRequest = addTokenToRequest(request, newAccessToken);
      return next(clonedRequest);
    }),
    catchError((error) => {
      authService.logout();
      console.log('error', error);
      return throwError(() => error);
    })
  );
}

const excludedEndpoints = ['/login', '/register', '/forgot-password'];

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Check if the request URL matches any of the excluded endpoints
  if (excludedEndpoints.some(endpoint => req.url.includes(endpoint))) {
    return next(req);
  }
  // Add auth header with access token if available
  const accessToken = authService.getAccessToken();
  if (accessToken) {
    req = addTokenToRequest(req, accessToken);
  }

  return next(req).pipe(
    // Catch errors, especially 401 Unauthorized (token expiration)
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Try to refresh the token
        return handle401Error(req, next, authService);
      }

      return throwError(() => error);
    })
  );
};
