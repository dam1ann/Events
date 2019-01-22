import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCreatorComponent } from './event-creator.component';
import { EventCreatorRoutingModule } from './event-creator-routing.module';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { ThirdStepComponent } from './third-step/third-step.component';
import { SuiModalModule } from 'ng2-semantic-ui';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    EventCreatorComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent
  ],
  imports: [
    CommonModule,
    SuiModalModule,
    RouterModule,
    EventCreatorRoutingModule
  ],
  exports: [
    EventCreatorComponent
  ]
})
export class EventCreatorModule {
}
