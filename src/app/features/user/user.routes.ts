import { Route } from '@angular/router';

export const USER_ROUTES: Route[] = [
    {
        path: '',
        loadComponent: () =>
            import('./user.component').then((c) => c.UserComponent),
        children: [
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full',
            },
            {
                path: 'dashboard',
                loadComponent: () =>
                    import(
                        './pages/dashboard/dashboard.component'
                    ).then((c) => c.DashboardComponent),
            },
            {
                path: 'todo-list',
                loadComponent: () =>
                    import(
                        './pages/todo-list/todo-list.component'
                    ).then((c) => c.ToDoListComponent),
            },
            {
                path: 'accounts',
                loadComponent: () =>
                    import(
                        './pages/accounts/accounts.component'
                    ).then((c) => c.AccountsComponent),
            },
            {
                path: 'wallet',
                loadComponent: () =>
                    import(
                        './pages/wallet/wallet.component'
                    ).then((c) => c.WalletComponent),
            },
            {
                path: 'profile',
                loadComponent: () =>
                    import(
                        './pages/profile/profile.component'
                    ).then((c) => c.ProfileComponent),
            },

            {
                path: '**',
                redirectTo: 'home',
            },
        ],
    },
];
