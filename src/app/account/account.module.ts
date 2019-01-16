import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AccountComponent} from './account.component';
import {AccountRoutingModule} from './account-routing.module';
import { EventsComponent } from './events/events.component';

@NgModule({
    declarations: [AccountComponent, EventsComponent],
    imports: [
        CommonModule,
        AccountRoutingModule
    ]
})
export class AccountModule {
}
