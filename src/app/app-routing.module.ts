import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
