import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventComponent } from './event/event.component';
import { FiltersComponent } from './filters/filters.component';
import { CommonModule } from '@angular/common';
import { SuiModule } from 'ng2-semantic-ui';

@NgModule({
  declarations: [
    DashboardComponent,
    EventsListComponent,
    EventComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SuiModule
  ]
})
export class DashboardModule {
}
