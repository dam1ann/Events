import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventCreatorComponent } from './event-creator.component';

const routes: Routes = [
  {
    path: '',
    component: EventCreatorComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventCreatorRoutingModule {
}
