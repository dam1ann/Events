import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import * as eventCreatorActions from '../../core/store/creator/creator.actions';
import { CreatorState } from '../../core/store/creator/creator.reducer';
import { FiltersService } from '../../core/services/filters.service';
import { ILocation } from '../../core/models/location.interface';


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit {

  locations$: Observable<Array<ILocation>>;
  loading: Observable<boolean>;
  moreInfoForm: FormGroup;

  get venue(): FormControl {
    return this.moreInfoForm.get('venue') as FormControl;
  }

  get address(): FormControl {
    return this.moreInfoForm.get('address') as FormControl;
  }

  get website(): FormControl {
    return this.moreInfoForm.get('website') as FormControl;
  }

  get location(): FormControl {
    return this.moreInfoForm.get('location') as FormControl;
  }


  constructor(private browserLocation: Location,
              private fb: FormBuilder,
              private store: Store<CreatorState>,
              private filters: FiltersService) {
  }

  ngOnInit() {
    this.locations$ = this.filters.locations;
    this.loading = this.store.select('creatorState', 'loading');
    this.moreInfoForm = this.fb.group({
      venue: [],
      address: [],
      website: [],
      location: []
    });
  }

  onNext() {
    this.store.dispatch(new eventCreatorActions.CheckMoreInfo({
      venue: this.venue.value || '',
      address: this.address.value || '',
      website: this.website.value || '',
      location: this.location.value || ''
    }));
  }

  onBack() {
    console.log('go back');
  }
}
