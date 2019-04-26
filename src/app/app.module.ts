import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NavbarModule } from './navbar/navbar.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';

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
    NavbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
