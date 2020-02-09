import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from './../assets/i18n/en.json';
import { AuthService } from './auth/_services/auth.service';
import { SpinnerFacades } from './_store/facades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading$: Observable<boolean>;
  public userIsAuthenticated: boolean = false;

  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService,
    private spinnerFacade: SpinnerFacades,
    private translate: TranslateService,
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.isLoading$ = this.spinnerFacade.isLoading();
  }

  public ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

}
