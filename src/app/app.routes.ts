import { Routes } from '@angular/router';
import { BlankComponent } from './layouts/blank/blank.component';
import { FullComponent } from './layouts/full/full.component';
import { authGuard } from './guards/auth.guard';
import { publicGuard } from './guards/public.guard';

export const routes: Routes = [
  {
    path: '',
    component: BlankComponent,
    canMatch: [publicGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/authentication/authentication.routes').then(m => m.AuthenticationRoutes),
      },
    ],
  },
  {
    path: '',
    component: FullComponent,
    canMatch: [authGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/pages.routes').then(m => m.PagesRoutes),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];
