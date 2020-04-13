import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountContainer } from './account.component';
import { AccountOverviewComponent } from './_components/account-overview/account-overview.component';
import { urls } from '../../_constants/urls.constant';

const routes: Routes = [
  {
    path: '',
    component: AccountContainer,
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
