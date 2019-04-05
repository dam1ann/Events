import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../../core/models/event.interface';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventComponent implements OnInit {

  @Input() event: IEvent;

  constructor() {
  }

  ngOnInit() {
  }

}
