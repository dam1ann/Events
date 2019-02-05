import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


interface AppState {
  name: string;
}


@Component({
  selector: 'app-second-step',
  templateUrl: './second-step.component.html',
  styleUrls: ['./second-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SecondStepComponent implements OnInit {

  creatorStore$: Observable<any>;
  state;

  constructor(private router: Router,
              private location: Location,
              private store: Store<AppState>,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.creatorStore$ = this.store.select('event-creator').pipe(
      tap(state => {
        // if (state && !state.loading && !state.error && this.state && this.state.loading) {
        //   return this.router.navigate(['../second'], {relativeTo: this.route});
        // }
        // if (state && state.name) {
        //   this.name = state.name;
        // }
        this.state = state;
      })
    );
  }


  async onNext() {

    await this.router.navigate(['../third'], {relativeTo: this.route});
  }

  async onBack() {
    this.location.back();
  }

  async onCancel() {
    this.location.back();
    this.location.back();
  }

}
