import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SuiModule } from 'ng2-semantic-ui';

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { EventsListComponent } from './events-list/events-list.component';
import { FiltersComponent } from './filters/filters.component';
import { listReducer } from '../core/store/list/event-list.reducer';
import { EventListEffects } from '../core/store/list/event-list-effects';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    EventsListComponent,
    FiltersComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SuiModule,
    StoreModule.forFeature('list', listReducer),
    EffectsModule.forFeature([EventListEffects]),
    SharedModule
  ]
})
export class DashboardModule {
}
