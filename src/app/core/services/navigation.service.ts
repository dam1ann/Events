import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { CoreModule } from '../core.module';

@Injectable({
  providedIn: CoreModule
})
export class NavigationService {

  constructor(private router: Router) {
  }

  to(path: string): Observable<boolean> {
    const url = this.router.routerState.snapshot.url;
    const newUrl = url.substring(0, url.lastIndexOf('/'));
    return from(this.router.navigate([`${newUrl}/${path}`]));
  }
}
