import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  ],
})
export class AuthModule {

}
