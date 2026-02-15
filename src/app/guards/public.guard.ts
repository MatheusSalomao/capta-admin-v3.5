import { inject } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';
import { LocalStorageService } from '@app/services/local-storage.service';
import { isTokenActive } from './auth.utils';

export const publicGuard: CanMatchFn = (_route, segments) => {
  const router = inject(Router);
  const storage = inject(LocalStorageService);
  const token = storage.getToken();
  const publicPaths = new Set(['', 'login', 'error']);
  if (segments.length > 0 && !publicPaths.has(segments[0]?.path ?? '')) {
    return false;
  }
  if (isTokenActive(token)) {
    return router.createUrlTree(['/dashboard']);
  }
  if (token) {
    storage.clearToken();
  }
  return true;
};
