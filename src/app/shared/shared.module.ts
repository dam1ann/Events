import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EventCardComponent } from './components/event-card/event-card.component';


@NgModule({
  declarations: [
    NotfoundComponent,
    TruncatePipe,
    EventCardComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TruncatePipe,
    NotfoundComponent,
    EventCardComponent
  ]
})
export class SharedModule {
}
