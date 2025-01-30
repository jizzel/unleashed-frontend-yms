import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CanActivateFn, CanMatchFn } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { UserRole } from '../models/auth.interface';
import {selectIsAuthenticated, selectUser} from '../../features/auth/store/selectors/auth.selectors';

// Helper function to check if user has required role
const hasRequiredRole = (userRole: UserRole, requiredRoles: UserRole[]): boolean => {
  // ADMIN role has access to everything
  if (userRole === UserRole.ADMIN) return true;
  return requiredRoles.includes(userRole);
};

// Authentication guard
export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        // Store the attempted URL for redirecting
        const returnUrl = state.url;
        router.navigate(['/login'], { queryParams: { returnUrl } });
        return false;
      }
      return true;
    })
  );
};

// Role-based guard
export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const requiredRoles = route.data?.['roles'] as UserRole[];

  if (!requiredRoles) {
    console.warn('No roles specified for roleGuard');
    return true;
  }

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      if (!hasRequiredRole(user.role, requiredRoles)) {
        router.navigate(['/']); // or an unauthorized page
        return false;
      }

      return true;
    })
  );
};

// Combined guard for both authentication and role checks
export const authRoleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);
  const requiredRoles = route.data?.['roles'] as UserRole[];

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (!user) {
        const returnUrl = state.url;
        router.navigate(['/login'], { queryParams: { returnUrl } });
        return false;
      }

      if (!hasRequiredRole(user.role, requiredRoles)) {
        router.navigate(['/']); // or an unauthorized page
        return false;
      }
      return true;
    })
  );
};

// Guard to prevent authenticated users from accessing auth pages (login/register)
export const noAuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      if (isAuthenticated) {
        router.navigate(['/admin/dashboard']);
        return false;
      }
      return true;
    })
  );
};

// Corresponding CanMatch guards for route matching
export const authMatchGuard: CanMatchFn = (route, segments) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectIsAuthenticated).pipe(
    take(1),
    map(isAuthenticated => {
      if (!isAuthenticated) {
        router.navigate(['/login']);
        return false;
      }
      return true;
    })
  );
};

// Guard to allow only Role.USER
export const userMatchGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      if (user.role !== UserRole.USER) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};

export const adminMatchGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(Store);

  return store.select(selectUser).pipe(
    take(1),
    map(user => {
      if (!user) {
        router.navigate(['/login']);
        return false;
      }

      if ([UserRole.ADMIN, UserRole.VIEWER, UserRole.EDITOR].includes(user.role)) {
        router.navigate(['/']);
        return false;
      }

      return true;
    })
  );
};
