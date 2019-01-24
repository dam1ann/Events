import { AfterViewChecked, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { ActiveModal } from 'ng2-semantic-ui/dist';
import { ActivatedRoute, Router } from '@angular/router';


interface IContext {
  data: string;
}

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCreatorComponent implements OnInit, AfterViewChecked, OnDestroy {

  activeStep: number;

  @ViewChild('modalTemplate')
  private modalTemplate: ModalTemplate<IContext, string, string>;
  private modal: ActiveModal<any, any, any>;

  constructor(private modalService: SuiModalService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
  }


  ngAfterViewChecked(): void {

    setTimeout(() => {
      this.open();
      this.modal.onDeny(() => {
        this._goBack();
      });
    }, 0);

  }


  ngOnDestroy(): void {
    this.modal.destroy();
    this._goBack();
  }

  open(dynamicContent: string = '') {
    const config = new TemplateModalConfig(this.modalTemplate);

    config.isBasic = true;
    config.size = 'normal';

    this.modal = this.modalService.open(config);
  }


  private _goBack(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
