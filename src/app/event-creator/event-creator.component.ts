import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalTemplate, SuiModalService, TemplateModalConfig } from 'ng2-semantic-ui';
import { ActiveModal } from 'ng2-semantic-ui/dist';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import { CreatorState } from '../core/store/event-creator/event-creator.reducer';
import * as eventCreatorActions from '../core/store/event-creator/event-creator.actions';

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

  @ViewChild('modalTemplate')
  private modalTemplate: ModalTemplate<IContext, string, string>;
  private modal: ActiveModal<any, any, any>;

  constructor(private modalService: SuiModalService,
              private route: ActivatedRoute,
              private location: Location,
              private store: Store<CreatorState>,
              private router: Router) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.open();
      this.modal.onDeny(() => {
        this.getBack();
      });
    }, 0);

  }

  ngOnDestroy(): void {
    this.modal.destroy();
  }


  private open(dynamicContent: string = '') {
    const config = new TemplateModalConfig(this.modalTemplate);
    config.size = 'tiny';
    config.isInverted = true;
    this.modal = this.modalService.open(config);
    this.store.select('creatorState', 'finished').subscribe(finished => {
      if (!finished) {
        return;
      }
      this.modal.destroy();
      this.store.dispatch(new eventCreatorActions.ClearState());
    });
  }

  private getBack() {
    const url = this.router.url;

    if (url.includes('first')) {
      this.location.back();
    } else if (url.includes('second')) {
      this.location.back();
      this.location.back();
    } else {
      this.location.back();
      this.location.back();
      this.location.back();
    }
  }
}
