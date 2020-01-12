import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import defaultLanguage from './../assets/i18n/en.json';
import { AuthService } from './auth/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private translate: TranslateService
  ) {
    translate.setTranslation('en', defaultLanguage);
    translate.setDefaultLang('en');
  }

  public ngOnInit(): void {
    this.authService.autoAuthUser();
  }

}
