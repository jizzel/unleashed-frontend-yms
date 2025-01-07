import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from '@angular/core';
import {LoaderService} from '../services/loader.service';
import {finalize} from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);

  // Don't show loader for some endpoints
  if (!req.url.includes('some-specific-endpoint')) {
    loaderService.show();
  }

  return next(req).pipe(
    finalize(() => {
      loaderService.hide();
    })
  );
};
