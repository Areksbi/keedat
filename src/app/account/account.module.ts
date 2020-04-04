import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountContainer } from './account.component';
import { AccountOverviewComponent } from './_components/account-overview/account-overview.component';
import { AccountRoutingModule } from './account-routing.module';
import { AngularMaterialModule } from '../_helpers';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AccountOverviewComponent,
    AccountContainer,
  ],
  imports: [
    AccountRoutingModule,
    AngularMaterialModule,
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {
}
