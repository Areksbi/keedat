import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountOverviewComponent } from './account-overview/account-overview.component';
import { urls } from '../_constants/urls.constant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: urls.ACCOUNT_OVERVIEW,
      },
      {
        path: urls.ACCOUNT_OVERVIEW,
        component: AccountOverviewComponent,
      },
    ],
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class AccountRoutingModule { }
