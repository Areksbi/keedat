import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [
    AccountOverviewComponent,
  ],
  imports: [
    AccountRoutingModule,
    CommonModule
  ],
})
export class AccountModule {
}
