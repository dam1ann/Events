import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { SuiModule } from 'ng2-semantic-ui';
import { AccountModule } from './account/account.module';
import { EventCreatorModule } from './event-creator/event-creator.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    CoreModule.forRoot(),
    AppRoutingModule,
    SuiModule,
    AccountModule,
    EventCreatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
