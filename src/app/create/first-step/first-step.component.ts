import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { CreatorState } from '../../core/store/creator/creator.reducer';
import { FiltersService } from '../../core/services';
import { ICategory } from '../../core/models';


@Component({
  selector: 'app-first-step',
  templateUrl: './first-step.component.html',
  styleUrls: ['./first-step.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FirstStepComponent implements OnInit, OnDestroy {

  @Output()
  next = new EventEmitter();

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
    this.next.emit({
      type: 'firstStep',
      data: {
        title: this.name.value || '',
        category: this.selectedCategories.map(cat => cat.name)[0] || {},
        categories: this.selectedCategories.map(cat => cat.name) || []
      }
    });
  }
}
