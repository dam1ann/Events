import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IEvent } from '../core/models/event.interface';
import { SingleEventState } from '../core/store/single-event/single-event.reducer';
import { Store } from '@ngrx/store';
import * as singleEventActions from '../core/store/single-event/single-event.actions';
import { tap } from 'rxjs/internal/operators/tap';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {

  event$: Observable<IEvent>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private titleService: Title,
              private store: Store<SingleEventState>) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(({title}) => {
      this.titleService.setTitle(`Events - ${title}`);
      this.event$ = this.store.select('singleEventState', 'event').pipe(tap(data => {
        console.log(data);
      }));
      this.store.dispatch(new singleEventActions.GetEvent());
    });
  }
}
