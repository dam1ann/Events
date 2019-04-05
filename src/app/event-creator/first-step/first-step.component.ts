import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import * as eventCreatorActions from '../../core/store/event-creator/event-creator.actions';
import { CreatorState } from '../../core/store/event-creator/event-creator.reducer';
import { FiltersService } from '../../core/services/filters.service';
import { ICategory } from '../../core/models/category.interface';


@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent implements OnInit, OnDestroy {

  categories$: Observable<Array<ICategory>>;
  selectedCategories: Array<ICategory>;
  firstStepForm: FormGroup;
  loading: Observable<boolean>;

  get name(): FormControl {
    return this.firstStepForm.get('name') as FormControl;
  }

  set name(value) {
    this.firstStepForm.get('name').setValue(value);
  }

  constructor(private store: Store<CreatorState>,
              private filters: FiltersService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.categories$ = this.filters.categories;
    this.loading = this.store.select('creatorState', 'loading');
    this.selectedCategories = [];
    this.firstStepForm = this.fb.group({
      name: []
    });
  }

  ngOnDestroy(): void {
  }


  /**
   * Select new category
   * If category exist in array of categories remove these category
   * Otherwise add category to list
   * @param category
   */
  selectCategory(category: ICategory) {
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
  }

  /**
   * Return true if category exist in array of categories
   * @param category
   */
  categoryExist(category: ICategory): boolean {
    return !!(this.selectedCategories.find(cat => cat.name === category.name));
  }

  /**
   * Check category name exist in database before go next
   */
  onNext() {
    this.store.dispatch(new eventCreatorActions.CheckName({
      title: this.name.value || '',
      categories: this.selectedCategories.map(cat => cat.name) || []
    }));
  }
}
