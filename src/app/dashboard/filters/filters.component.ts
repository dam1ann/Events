import { ChangeDetectionStrategy, EventEmitter, Component, Input, Output, OnInit } from '@angular/core';
import { ICategory, ILocation } from '../../core/models';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {

  @Input() categories: Array<ICategory>;
  @Input() locations: Array<ILocation>;
  @Output() filter = new EventEmitter();

  private _selectedLocations: Array<any>;
  private _selectedCategories: Array<any>;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this._selectedCategories = [];
    this._selectedLocations = [];

    this.route.queryParams.subscribe(params => {
      const {category} = params;

      console.log(params);
      this.onCategoryClick(category);
    });
  }


  categoryExist(category): boolean {
    return this._selectedCategories.find(cat => cat === category);
  }

  locationExist(location): boolean {
    return this._selectedLocations.find(loc => loc === location);
  }

  onCategoryClick(category) {

    if (this.categoryExist(category)) {
      this._selectedCategories = this._selectedCategories.reduce((all, curr) => {
        if (curr !== category) {
          all = [curr, ...all];
        }
        return all;
      }, []);

    } else {
      this._selectedCategories = [...this._selectedCategories, category];
    }

    this.filter.next({categories: this._selectedCategories});
  }

  onLocationClick(location) {

    if (this.locationExist(location)) {
      this._selectedLocations = this._selectedLocations.reduce((all, curr) => {
        if (curr !== location) {
          all = [curr, ...all];
        }
        return all;
      }, []);

    } else {
      this._selectedLocations = [...this._selectedLocations, location];
    }

    this.filter.next({locations: this._selectedLocations});

  }
}
