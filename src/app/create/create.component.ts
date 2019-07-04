import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CreatorState } from '../core/store/event-creator/event-creator.reducer';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  modalIdentifier: string;
  state;

  constructor(private ngxSmartModalService: NgxSmartModalService,
              private store: Store<CreatorState>) {
  }

  ngOnInit() {
    this.modalIdentifier = 'createEvent';
    this.state = this.store.select('creatorState').pipe(tap(data => {
      console.log(data);
    }));
  }

  open(name: string) {
    this.ngxSmartModalService.getModal(this.modalIdentifier).open();
  }

  close(name: string) {
  }

}
