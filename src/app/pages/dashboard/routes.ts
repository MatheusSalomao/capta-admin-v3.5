import { Routes } from '@angular/router';
import { DashboardComponent } from '@app/pages/dashboard/dashboard.component';

export const children: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: {
      title: 'Dashboard',
      urls: [{ title: 'Dashboard', url: '/dashboard' }],
    },
  },
];
