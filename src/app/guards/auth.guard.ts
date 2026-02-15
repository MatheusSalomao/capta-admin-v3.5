import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage.service';
import { isTokenActive } from './auth.utils';

export const authGuard: CanMatchFn = () => {
  const router = inject(Router);
  const storage = inject(LocalStorageService);
  const token = storage.getToken();
  if (isTokenActive(token)) {
    return true;
  }
  if (token) {
    storage.clearToken();
  }
  return router.createUrlTree(['/login']);
};
