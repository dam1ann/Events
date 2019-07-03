import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { listReducer } from '../core/store/event-list/event-list.reducer';
import { EffectsModule } from '@ngrx/effects';
import { EventListEffects } from '../core/store/event-list/event-list-effects';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    StoreModule.forFeature('listState', listReducer),
    EffectsModule.forFeature([EventListEffects])
  ]
})
export class HomeModule {
}
