import { ChangeDetectionStrategy, Component, Input, OnInit, Output } from '@angular/core';
import { IEvent } from '../../core/models/event.interface';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent implements OnInit {

  @Input() events: Array<IEvent>;

  constructor() {
  }

  ngOnInit() {
  }

}
