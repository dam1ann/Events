import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { TruncatePipe } from './pipes/truncate.pipe';


@NgModule({
  declarations: [
    NotfoundComponent,
    TruncatePipe
  ],

  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TruncatePipe,
    NotfoundComponent
  ]
})
export class SharedModule {
}
