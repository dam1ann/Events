import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreatorComponent } from './event-creator.component';
import { EventCreatorRoutingModule } from './event-creator-routing.module';

@NgModule({
  declarations: [EventCreatorComponent],
  imports: [
    CommonModule,
    EventCreatorRoutingModule,
  ]
})
export class EventCreatorModule { }
