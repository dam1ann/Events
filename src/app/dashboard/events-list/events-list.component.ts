import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

const user = {
  name: 'Janusz',
  surname: 'Kowalski',
  city: 'Warsaw',
  interest: []
};

const events = [
  {
    name: 'Koncert',
    description: 'lorem',
    time: new Date(),
    created: new Date(),
    creator: user,
    comments: [],
    likes: 10
  }, {
    name: 'Spektakt w teatrze',
    description: 'loremdwad wa daw',
    created: new Date()
  }
];

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventsListComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
