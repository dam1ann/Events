import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-event-creator',
    templateUrl: './event-creator.component.html',
    styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {

    activeStep: number;

    constructor() {
    }

    ngOnInit() {
        this.activeStep = 1;
    }

}
