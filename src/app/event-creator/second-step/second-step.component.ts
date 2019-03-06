import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ApiService } from '../../core/services/api.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import * as eventCreatorActions from '../../core/store/event-creator/event-creator.actions';
import { AppState } from '../../core/store';
import { UserState } from '../../core/store/user/user.reducer';
import { CreatorState } from '../../core/store/event-creator/event-creator.reducer';




@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit {

  locations: Array<any>;
  creatorStore$: Observable<any>;
  moreInfoForm: FormGroup;
  state;

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


  constructor(private router: Router,
              private lc: Location,
              private api: ApiService,
              private fb: FormBuilder,
              private store: Store<CreatorState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.creatorStore$ = this.store.select('creatorState').pipe(
      tap(state => {
        if (state && !state.loading && !state.error && this.state && this.state.loading) {
          return this.router.navigate(['../third'], {relativeTo: this.route});
        }

        this.state = state;
      })
    );

    this.api.getLocations().subscribe(data => {
      this.locations = data;
    });

    this.moreInfoForm = this.fb.group({
      venue: [],
      address: [],
      website: [],
      location: []
    });
  }

  async onNext() {
    this.store.dispatch(new eventCreatorActions.CheckMoreInfo({
      venue: this.venue.value || '',
      address: this.address.value || '',
      website: this.website.value || '',
      location: this.location.value || ''
    }));
  }

  async onBack() {
    this.lc.back();
  }
}
