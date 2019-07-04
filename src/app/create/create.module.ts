import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create.component';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { EventCreatorModule } from '../event-creator/event-creator.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { creatorReducer } from '../core/store/event-creator/event-creator.reducer';
import { EventCreatorEffects } from '../core/store/event-creator/event-creator.effects';

@NgModule({
  declarations: [CreateComponent],
  exports: [
    CreateComponent
  ],
  imports: [
    CommonModule,
    NgxSmartModalModule.forRoot(),
    EventCreatorModule,
    StoreModule.forFeature('creatorState', creatorReducer),
    EffectsModule.forFeature([EventCreatorEffects])
  ]
})
export class CreateModule {
}
