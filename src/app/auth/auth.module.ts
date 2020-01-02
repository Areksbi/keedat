import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularMaterialModule } from '../_helpers/angular-material.module';
import { AuthContainer } from './auth.container';
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
  ],
})
export class AuthModule {

}
