import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  }, {
    path: 'event',
    loadChildren: './event/event.module#EventModule'
  }, {
    path: 'account',
    loadChildren: './account/account.module#AccountModule'
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule'
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
