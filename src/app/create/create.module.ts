import { SuiPopupModule, SuiSelectModule } from 'ng2-semantic-ui/dist';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CreateComponent } from './create.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { EventCreatorModule } from '../event-creator/event-creator.module';
import { creatorReducer } from '../core/store/creator/creator.reducer';
import { CreatorEffects } from '../core/store/creator/creator.effects';
import { FirstStepComponent } from './first-step/first-step.component';
import { SecondStepComponent } from './second-step/second-step.component';
import { ThirdStepComponent } from './third-step/third-step.component';

@NgModule({
  declarations: [
    CreateComponent,
    FirstStepComponent,
    SecondStepComponent,
    ThirdStepComponent
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
    EventCreatorModule,
    FormsModule,
    SuiPopupModule,
    SuiSelectModule,
    ReactiveFormsModule,
    StoreModule.forFeature('create', creatorReducer),
    EffectsModule.forFeature([CreatorEffects])
  ],
  exports: [
    CreateComponent
  ],
})
export class CreateModule {
}
