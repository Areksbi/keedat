import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from './../assets/i18n/en.json';
import { SpinnerService } from './_services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;

  private isLoadingSub: Subscription;

  constructor(
    private spinnerService: SpinnerService,
    private translate: TranslateService,
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.isLoading = this.spinnerService.isLoading;
    this.isLoadingSub = this.spinnerService.isLoadingListener
      .subscribe((isLoading: boolean) => this.isLoading = isLoading);
  }

  public ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }

}
