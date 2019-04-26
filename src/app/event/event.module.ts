import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventComponent } from './event.component';
import { EventRoutingModule } from './event-routing.module';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { singleEventReducer } from '../core/store/single-event/single-event.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SingleEventsEffects } from '../core/store/single-event/single-events.efffects';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [EventComponent],
  imports: [
    CommonModule,
    RouterModule,
    EventRoutingModule,
    StoreModule.forFeature('singleEventState', singleEventReducer),
    EffectsModule.forFeature([SingleEventsEffects]),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDAopkC8WFvI3UD0z-nyQmdVoZ81QVGJlk'
    })
  ]
})
export class EventModule {
}
