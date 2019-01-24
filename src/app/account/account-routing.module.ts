import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { EventsComponent } from './events/events.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'events'
      },
      {
        path: 'events',
        component: EventsComponent,
        children: [
          {
            path: 'create',
            loadChildren: './../event-creator/event-creator.module#EventCreatorModule'
          }
        ]
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
