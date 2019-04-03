import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    data: {
      title: ''
    }
  }, {
    path: 'event',
    loadChildren: './event/event.module#EventModule',
    data: {
      title: 'Sample event'
    }
  }, {
    path: 'account',
    loadChildren: './account/account.module#AccountModule',
    data: {
      title: 'Account'
    }
  }, {
    path: 'settings',
    loadChildren: './settings/settings.module#SettingsModule',
    data: {
      title: 'Settings'
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    relativeLinkResolution: 'corrected',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
