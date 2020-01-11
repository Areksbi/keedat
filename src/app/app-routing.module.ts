import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyPolicyComponent } from './_components/privacy-policy/privacy-policy.component';
import { urls } from './_constants/urls.constant';
import { UserAgreementComponent } from './_components/user-agreement/user-agreement.component';


const routes: Routes = [
  {
    component: PrivacyPolicyComponent,
    path: urls.PRIVACY_POLICY,
  },
  {
    component: UserAgreementComponent,
    path: urls.USER_AGREEMENT,
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
