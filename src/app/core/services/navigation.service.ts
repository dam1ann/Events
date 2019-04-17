import { Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@Injectable()
export class NavigationService {

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private title: Title) {
    this.updateTitle();
  }


  to(path: string): Observable<boolean> {
    const url = this.router.routerState.snapshot.url;
    const newUrl = url.substring(0, url.lastIndexOf('/'));
    return from(this.router.navigate([`${newUrl}/${path}`]));
  }


  private updateTitle() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) {
          route = route.firstChild;
        }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(event => {
      this.title.setTitle(`Events${event['title'] ? ' - ' + event['title'] : ''}`);
    });

  }
}
