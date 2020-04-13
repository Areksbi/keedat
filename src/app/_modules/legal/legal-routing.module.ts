import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { urls } from '../../_constants/urls.constant';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: urls.PRIVACY_POLICY,
      },
      {
        path: urls.PRIVACY_POLICY,
        component: PrivacyPolicyComponent,
      },
    ],
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class LegalRoutingModule { }
