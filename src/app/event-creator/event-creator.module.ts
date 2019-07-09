import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SuiModalModule, SuiPopupModule, SuiSelectModule } from 'ng2-semantic-ui';

import { EventCreatorComponent } from './event-creator.component';


@NgModule({
  declarations: [
    EventCreatorComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SuiModalModule,
    RouterModule,
    SuiPopupModule,
    SuiSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    EventCreatorComponent
  ]
})
export class EventCreatorModule {
}
