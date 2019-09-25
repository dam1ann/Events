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
import { CreateModule } from './create/create.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


class Utils {

    static double(num: number): number {

    }
}


class Person {
    name;

    constructor(name) {
        this.name = name;
    }

    double(): Number {
        return;
    }

    toString() {
        return String(this.name);
    }
}

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
    AppRoutingModule,
    SuiModule,
    AccountModule,
    CoreModule.forRoot(),
    CreateModule,
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    static PI;


}
