import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { AccountRoutingModule } from './account-routing.module';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SuiModalModule } from 'ng2-semantic-ui';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    AccountComponent,
    EventsComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    SuiModalModule,
    AccountRoutingModule,
  ],
  exports: [
    LoginComponent,
    RegistrationComponent
  ]
})
export class AccountModule {
}
