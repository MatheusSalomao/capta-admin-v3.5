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
        loadChildren: () => import('./pages/authentication/routes').then(m => m.children),
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
        loadChildren: () => import('./pages/routes').then(r => r.children),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/error',
  },
];
