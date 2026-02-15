import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { isTokenActive } from './auth.utils';

export const authGuard: CanActivateChildFn = () => {
  const router = inject(Router);
  const token = localStorage.getItem('api_token');
  if (isTokenActive(token)) {
    return true;
  }
  if (token) {
    localStorage.removeItem('api_token');
  }
  return router.createUrlTree(['/login']);
};
