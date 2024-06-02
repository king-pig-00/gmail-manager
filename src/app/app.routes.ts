import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.component').then(
        (c) => c.HomeComponent
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./features/user/user.routes').then((r) => r.USER_ROUTES),
    // TODO: we'll need to update this once we have MSAl configured
    // canActivate: [roleGuardCanActivate],
    // data: {
    //     expectedRole: [roles.Agent],
    //     overrideRole: [roles.Admin, roles.Developer],
    // },
  },
];
