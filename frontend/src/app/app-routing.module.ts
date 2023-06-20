import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'usuarios',
        pathMatch: 'full'
    },
    {
        path: 'usuarios',
        loadComponent: () => import('./presentation/pages/users').then(c => c.UsersComponent),
    },
    {
        path: 'perfil/:user',
        loadComponent: () => import('./presentation/pages/profile').then(c => c.ProfileComponent),
    },
    {
        path: 'graficos',
        loadComponent: () => import('./presentation/pages/chart').then(c => c.ChartComponent),
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
