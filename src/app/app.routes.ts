import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'reserva',
    pathMatch: 'full',
  },
  {
    path: 'reserva',
    loadComponent: () =>
      import('./reserva/reserva.page').then((m) => m.ReservaPage),
  },
  {
    path: 'email-logs',
    loadComponent: () =>
      import('./email-log/email-log.page').then((m) => m.EmailLogPage),
  },
];
