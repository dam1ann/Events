import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { SingleEventState } from '../core/store/event/single-event.reducer';
import * as singleEventActions from '../core/store/event/single-event.actions';
import { IEvent } from '../core/models';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit, OnDestroy {

  event$: Observable<IEvent>;
  latitude = 52.13;
  longitude = 21.00;
  mapType = 'satellite';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleService: Title,
              private store: Store<SingleEventState>) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(({title}) => {
      this.titleService.setTitle(`Events - ${title}`);
      this.event$ = this.store.select('event', 'data');
      this.store.dispatch(new singleEventActions.GetEvent(title));
    });
  }

  ngOnDestroy() {
    this.store.dispatch(new singleEventActions.ClearState());
  }
}
