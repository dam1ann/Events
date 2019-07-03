import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { EventComponent } from './components/event/event.component';


@NgModule({
  declarations: [
    NotfoundComponent,
    TruncatePipe,
    EventComponent
  ],

  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TruncatePipe,
    NotfoundComponent,
    EventComponent
  ]
})
export class SharedModule {
}
