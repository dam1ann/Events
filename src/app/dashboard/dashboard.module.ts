import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SuiModule } from 'ng2-semantic-ui';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { EventComponent } from './event/event.component';
import { FiltersComponent } from './filters/filters.component';
import { listReducer } from '../core/store/event-list/event-list.reducer';
import { EventListEffects } from '../core/store/event-list/event-list-effects';
import { SharedModule } from '../shared/shared.module';

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
    SuiModule,
    StoreModule.forFeature('listState', listReducer),
    EffectsModule.forFeature([EventListEffects]),
    SharedModule
  ]
})
export class DashboardModule {
}
