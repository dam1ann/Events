import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as eventCreatorActions from '../../core/store/event-creator/event-creator.actions';
import { Observable } from 'rxjs';


interface AppState {
  name: string;
}

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent implements OnInit {

  header = 'Add new event';
  name: string;
  name$: Observable<any>;

  constructor(private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.name$ = this.store.select('event-creator');
  }

  async onNext() {
    this.store.dispatch(new eventCreatorActions.CheckName({name: this.name}));


    await this.router.navigate(['../second'], {relativeTo: this.route});
  }

  async onCancel() {
    this.location.back();
  }
}
