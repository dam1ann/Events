import { AfterViewChecked, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { ActiveModal } from 'ng2-semantic-ui/dist';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';


interface IContext {
  data: string;
}

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCreatorComponent implements OnInit, OnDestroy {

  activeStep = 1;

  @ViewChild('modalTemplate')
  private modalTemplate: ModalTemplate<IContext, string, string>;
  private modal: ActiveModal<any, any, any>;


  constructor(private modalService: SuiModalService,
              private route: ActivatedRoute,
              private _location: Location,
              private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.open();
      this.modal.onDeny(() => this.onDeny());
    }, 0);

  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }

  open(dynamicContent: string = '') {
    const config = new TemplateModalConfig(this.modalTemplate);

    config.size = 'normal';
    config.isInverted = true;

    this.modal = this.modalService.open(config);
  }


  onDeny() {
    this.cancel();
  }


  async next() {
    switch (this.activeStep) {
      case 1 :
        await this.router.navigate([`../create/second`], {relativeTo: this.route});
        this.activeStep++;
        break;

      case 2 :
        await this.router.navigate([`../create/third`], {relativeTo: this.route});
        this.activeStep++;
        break;

    }
  }


  async back() {
    switch (this.activeStep) {
      case 2 :
        await this.router.navigate([`../create/first`], {relativeTo: this.route});
        this.activeStep--;
        break;

      case 3 :
        await this.router.navigate([`../create/second`], {relativeTo: this.route});
        this.activeStep--;
        break;

    }
  }

  async cancel() {
    await this.router.navigate(['../'], {relativeTo: this.route});
  }
}
