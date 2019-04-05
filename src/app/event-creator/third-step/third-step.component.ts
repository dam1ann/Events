import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';
import * as eventCreatorActions from '../../core/store/event-creator/event-creator.actions';
import { CreatorState } from '../../core/store/event-creator/event-creator.reducer';


@Component({
  selector: 'app-third-step',
  templateUrl: './third-step.component.html',
  styleUrls: ['./third-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThirdStepComponent implements OnInit {

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<CreatorState>,
              private location: Location) {
  }

  ngOnInit() {
  }

  async onFinish() {


    await this.store.dispatch(new eventCreatorActions.CreateEvent());
  }

  async onBack() {
    await this.location.back();
  }

}
