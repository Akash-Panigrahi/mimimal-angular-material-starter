import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { InternalServerErrorComponent } from './core/components/internal-server-error/internal-server-error.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

// Guards
import { NotLoggedInUserGuard } from './core/guards/not-logged-in-user.guard';
import { LoggedInUserGuard } from './core/guards/logged-in-user.guard';

const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./auth/auth.module').then(m => m.AuthModule),
        canActivate: [NotLoggedInUserGuard]
        // canLoad: [NotLoggedInUserGuard]
    },
    {
        path: '',
        loadChildren: () =>
            import('./home/home.module').then(m => m.HomeModule),
        canActivate: [LoggedInUserGuard]
        // canLoad: [LoggedInUserGuard]
    },
    {
        path: '500',
        component: InternalServerErrorComponent,
        data: { title: 'Internal Server Error' }
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        data: { title: 'Page Not Found' }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule {}
