import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrivacyPolicyComponent } from './_components';
import { urls } from './_constants/urls.constant';


const routes: Routes = [
  {
    component: PrivacyPolicyComponent,
    path: urls.PRIVACY_POLICY,
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
