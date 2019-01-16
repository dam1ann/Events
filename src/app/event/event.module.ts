import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventComponent} from './event.component';
import {EventRoutingModule} from './event-routing.module';
import {RouterModule} from '@angular/router';

@NgModule({
    declarations: [EventComponent],
    imports: [
        CommonModule,
        RouterModule,
        EventRoutingModule
    ]
})
export class EventModule {
}
