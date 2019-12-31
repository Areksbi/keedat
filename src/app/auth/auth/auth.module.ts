import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthContainer } from './auth.container';

@NgModule({
  declarations: [
    AuthContainer,
  ],
  exports: [
    AuthContainer,
  ],
  imports: [
    CommonModule,
  ],
})
export class AuthModule {

}
