import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Store } from '@ngrx/store';

import * as eventCreatorActions from '../../core/store/event-creator/event-creator.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


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
  name;

  creatorStore$: Observable<any>;
  state;

  constructor(private router: Router,
              private location: Location,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.creatorStore$ = this.store.select('event-creator').pipe(
      tap(state => {
        if (state && !state.loading && !state.error && this.state && this.state.loading) {
          return this.router.navigate(['../second'], {relativeTo: this.route});
        }
        if (state && state.name) {
          this.name = state.name;
        }
        this.state = state;
      })
    );
  }

  async onNext() {
    await this.store.dispatch(new eventCreatorActions.CheckName({name: this.name}));
  }

  async onCancel() {
    this.location.back();
  }

}
