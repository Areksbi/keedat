import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { urls } from './_constants/urls.constant';

const routes: Routes = [
  {
    path: urls.PRIVACY_POLICY,
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
  },
  {
    path: '**',
    redirectTo: urls.HOME,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
