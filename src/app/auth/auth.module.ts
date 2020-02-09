import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';

import { AngularMaterialModule } from '../_helpers';
import { AuthContainer } from './auth.container';
import { AuthEffects } from './_store/effects/auth.effects';
import { authFeatureKey, authReducer } from './_store/reducers/auth.reducer';
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
    EffectsModule.forFeature([AuthEffects]),
    HttpClientModule,
    ReactiveFormsModule,
    StoreModule.forFeature(authFeatureKey, authReducer),
    TranslateModule
  ],
})
export class AuthModule {

}
