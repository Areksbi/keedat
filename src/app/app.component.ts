import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from './../assets/i18n/en.json';
import { AuthFacade } from './_modules/auth/_store/facades/auth.facades';
import { AuthService } from './_modules/auth/_services/auth.service';
import { SpinnerFacades } from './_store/facades';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoading$: Observable<boolean>;
  public userIsAuthenticated$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
    private authService: AuthService,
    private spinnerFacade: SpinnerFacades,
    private translate: TranslateService,
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.authService.autoAuthUser();
    this.userIsAuthenticated$ = this.authFacade.getIsAuth();
    this.isLoading$ = this.spinnerFacade.isLoading();
  }

}
