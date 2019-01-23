import {AfterViewChecked, ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {ModalTemplate, SuiModalService, TemplateModalConfig} from 'ng2-semantic-ui';
import {ActiveModal} from 'ng2-semantic-ui/dist';


interface IContext {
    data: string;
}

@Component({
    selector: 'app-event-creator',
    templateUrl: './event-creator.component.html',
    styleUrls: ['./event-creator.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCreatorComponent implements OnInit, AfterViewChecked {

    activeStep: number;

    @ViewChild('modalTemplate')
    private modalTemplate: ModalTemplate<IContext, string, string>;
    private modal: ActiveModal<any, any, any>;

    constructor(private modalService: SuiModalService) {
    }

    ngOnInit() {
    }


    ngAfterViewChecked(): void {

        setTimeout(() => {
            this.open();
            this.modal.onDeny(this._denyModal);
        }, 0);

    }

    open(dynamicContent: string = '') {
        const config = new TemplateModalConfig(this.modalTemplate);

        config.isBasic = true;
        config.size = 'normal';

        this.modal = this.modalService.open(config);
    }


    private _denyModal() {
        console.log('test');
    }


}
