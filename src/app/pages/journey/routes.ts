import { Routes } from '@angular/router';
import { JourneyComponent } from '@app/pages/journey/journey.component';

export const children: Routes = [
  {
    path: '',
    component: JourneyComponent,
    data: {
      title: 'Jornadas',
      urls: [{ title: 'Jornadas', url: '/jornadas' }],
      boxed: false,
    },
  },
];
