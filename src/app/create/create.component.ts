import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CreatorState } from '../core/store/creator/creator.reducer';
import { Store } from '@ngrx/store';
import * as creatorActions from '../core/store/creator/creator.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  loading$: Observable<boolean>;
  step$: Observable<string>;
  modalIdentifier: string;

  constructor(private ngxSmartModalService: NgxSmartModalService,
              private store: Store<CreatorState>) {
  }

  ngOnInit() {
    this.modalIdentifier = 'create-event';
    this.loading$ = this.store.select('create', 'loading');
    this.step$ = this.store.select('create', 'step').pipe(tap(data => {
      console.log(data);
    }));
  }

  open() {
    this.ngxSmartModalService.getModal(this.modalIdentifier).open();
  }


  close() {
    this.store.dispatch(new creatorActions.ClearState());
    this.ngxSmartModalService.getModal(this.modalIdentifier).close();
  }
}
