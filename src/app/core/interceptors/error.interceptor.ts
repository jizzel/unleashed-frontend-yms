import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {Router} from '@angular/router';
import {inject} from '@angular/core';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if ([403].includes(error.status)) {
        // Clear storage and redirect to login
        localStorage.clear();
        router.navigate(['/auth/login']);
      }

      return throwError(() => error);
    })
  );
};
