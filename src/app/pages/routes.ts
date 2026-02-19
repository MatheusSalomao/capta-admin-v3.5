import { Routes } from '@angular/router';

export const children: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/routes').then(r => r.children),
  },
  {
    path: 'jornadas',
    loadChildren: () => import('./journey/routes').then(r => r.children),
  },
];
