import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModalModule, SuiPopupModule, SuiSelectModule } from 'ng2-semantic-ui';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { EventCreatorComponent } from './event-creator.component';
import { EventCreatorRoutingModule } from './event-creator-routing.module';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { ThirdStepComponent } from './third-step/third-step.component';
import { EventCreatorEffects } from '../core/store/event-creator/event-creator.effects';
import { creatorReducer } from '../core/store/event-creator/event-creator.reducer';


@NgModule({
  declarations: [
    EventCreatorComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SuiModalModule,
    RouterModule,
    EventCreatorRoutingModule,
    SuiPopupModule,
    SuiSelectModule,
    StoreModule.forFeature('creatorState', creatorReducer),
    EffectsModule.forFeature([EventCreatorEffects]),
    ReactiveFormsModule
  ],
  exports: [
    EventCreatorComponent
  ]
})
export class EventCreatorModule {
}
