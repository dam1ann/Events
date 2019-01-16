import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EventCreatorComponent} from './event-creator.component';
import {FirstStepComponent} from './first-step/first-step.component';
import {SecondStepComponent} from './second-step/second-step.component';
import {ThirdStepComponent} from './third-step/third-step.component';

const routes: Routes = [
    {
        path: '',
        component: EventCreatorComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'first'
            },
            {
                path: 'first',
                component: FirstStepComponent
            },
            {
                path: 'second',
                component: SecondStepComponent
            },
            {
                path: 'third',
                component: ThirdStepComponent
            }
        ]
    }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventCreatorRoutingModule {
}
