import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../../core/models';

@Component({
  selector: 'app-event',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventCardComponent implements OnInit {

  @Input() event: IEvent;

  constructor() {
  }

  ngOnInit() {
  }

}
