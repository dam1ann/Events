import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FiltersService } from '../core/services';
import { Observable } from 'rxjs';
import { ICategory } from '../core/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  categories$: Observable<Array<ICategory>>;

  constructor(private filters: FiltersService) {
  }

  ngOnInit() {
    this.categories$ = this.filters.categories;
  }

}
