import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';


export function parseUrlPathInSegments(fullUrl: string): Array<string> {
    return fullUrl
        .split('/')
        .filter(segment => segment)
        .map(segment => {
            let path = segment;
            const paramPos = path.indexOf(';');
            if (paramPos > -1) {
                path = path.substring(0, paramPos);
            }
            const outletPos = path.indexOf(':');
            if (outletPos > -1) {
                path = path.substring(outletPos + 1, path.length - 1);
            }
            return path;
        });
}


@Injectable()
export class DynamicPathGuard implements CanActivate {

    constructor(private router: Router) {
    }

    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const segments = parseUrlPathInSegments(state.url);
        const lastPath = segments.pop();

        if (lastPath === 'dynamic') {

            // Trigger change detection so url is known for router
            setTimeout(async () => {
                await this.router.navigateByUrl(state.url);
            }, 0);
        } else {
            await this.router.navigateByUrl('/404');
        }

        return false;
    }
}
