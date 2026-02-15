import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { isTokenActive } from './auth.utils';

export const publicGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('api_token');
  if (isTokenActive(token)) {
    return router.createUrlTree(['/']);
  }
  if (token) {
    localStorage.removeItem('api_token');
  }
  return true;
};
