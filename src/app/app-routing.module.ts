import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        data: {preload: true, delay: true}
    }, {
        path: 'event',
        loadChildren: './event/event.module#EventModule'
    }, {
        path: 'account',
        loadChildren: './account/account.module#AccountModule'
    }, {
        path: 'create',
        loadChildren: './event-creator/event-creator.module#EventCreatorModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'enabled'
    })],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
