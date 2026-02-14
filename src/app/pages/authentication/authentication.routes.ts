import { Routes } from '@angular/router';

import { AppErrorComponent } from './error/error.component';
import { LoginComponent } from '@app/pages/authentication/login/login.component';

export const AuthenticationRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
      },
      {
        title: 'Login',
        path: 'login',
        component: LoginComponent,
      },
      {
        title: 'Error 404',
        path: 'error',
        component: AppErrorComponent,
      },
    ],
  },
];
