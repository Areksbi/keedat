import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from './../assets/i18n/en.json';
import { AuthService } from './auth/_services/auth.service';
import { SpinnerService } from './_services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public userIsAuthenticated: boolean = false;

  private authListenerSubs: Subscription;
  private isLoadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private translate: TranslateService,
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  private manageIconFonts(): void {
    const iconFontName = '1rem Material Icons';

    // @ts-ignore
    if ('fonts' in document && !document.fonts.check(iconFontName)){
      // @ts-ignore
      document.body.classList.add('mat-icon-font-missing');
      // @ts-ignore
      document.fonts.load(iconFontName)
        .then(() => document.body.classList.remove('mat-icon-font-missing'));
    }
  }

  public ngOnInit(): void {
    this.authService.autoAuthUser();
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });

    this.isLoading = this.spinnerService.isLoading;
    this.isLoadingSub = this.spinnerService.isLoadingListener
      .subscribe((isLoading: boolean) => this.isLoading = isLoading);

    this.manageIconFonts();
  }

  public ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
    this.isLoadingSub.unsubscribe();
  }
}
