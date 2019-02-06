import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as eventCreatorActions from '../../core/store/event-creator/event-creator.actions';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../../core/services/api.service';


interface AppState {
  name: string;
}

@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss']
})
export class FirstStepComponent implements OnInit, OnDestroy {


  header = 'Add new event';
  categories: Array<any>;
  selectedCategories: Array<any>;
  creatorStore$: Observable<any>;

  private state;
  private name;

  constructor(private router: Router,
              private api: ApiService,
              private route: ActivatedRoute,
              private store: Store<AppState>) {
  }

  ngOnInit() {
    this.creatorStore$ = this.store.select('event-creator').pipe(
      tap(state => {
        if (state && !state.loading && !state.error && this.state && this.state.loading) {
          return this.router.navigate(['../second'], {relativeTo: this.route});
        }
        if (state && state.name) {
          this.name = state.name;
        }
        this.state = state;
      })
    );

    this.api.getCategories().subscribe(data => {
      this.categories = data;
      console.log(data);
    });
    this.selectedCategories = [];
  }


  ngOnDestroy(): void {
  }


  selectCategory(category) {

    if (this.categoryExist(category)) {
      this.selectedCategories = this.selectedCategories.reduce((all, curr) => {
        if (curr.name !== category.name) {
          all = [curr, ...all];
        }
        return all;
      }, []);

    } else {
      this.selectedCategories = [...this.selectedCategories, category];
    }
    console.log(this.selectedCategories);
  }

  categoryExist(category): boolean {
    return this.selectedCategories.find(cat => cat.name === category.name);

  }

  async onNext() {
    await this.store.dispatch(new eventCreatorActions.CheckName({name: this.name}));
  }
}
