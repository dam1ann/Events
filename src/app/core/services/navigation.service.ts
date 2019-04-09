import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable()
export class NavigationService {

  constructor(private router: Router) {
  }

  to(path: string): Observable<boolean> {
    const url = this.router.routerState.snapshot.url;
    const newUrl = url.substring(0, url.lastIndexOf('/'));
    return from(this.router.navigate([`${newUrl}/${path}`]));
  }
}
