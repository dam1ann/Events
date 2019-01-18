import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar.component';
import { RouterModule } from '@angular/router';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [
    SearchComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    NavbarComponent
  ]
})
export class NavbarModule {
}
