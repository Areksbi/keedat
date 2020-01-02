import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';

import { AngularMaterialModule } from '../_helpers/angular-material.module';
import { AuthContainer } from './auth.container';
import { environment } from '../../environments/environment';
import { LoginComponent, RegistrationComponent } from './_components';

@NgModule({
  declarations: [
    AuthContainer,
    LoginComponent,
    RegistrationComponent,
  ],
  exports: [
    AuthContainer,
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha
    },
  ],
})
export class AuthModule {

}
