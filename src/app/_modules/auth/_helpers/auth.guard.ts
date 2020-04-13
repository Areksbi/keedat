import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { AuthFacade } from '../_store/facades/auth.facades';
import { links } from '../../../_constants/links.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authFacade: AuthFacade,
    private router: Router,
  ) {
  }

  public canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authFacade.getIsAuth()
      .pipe(
        switchMap((isAuth: boolean) => {
          if (isAuth) {
            return of(isAuth);
          }
          this.router.navigate([links.HOME], { queryParams: { returnUrl: state.url }});
          return of(false);
        })
      )
  }

}
