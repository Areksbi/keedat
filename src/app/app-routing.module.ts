import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_modules/auth/_helpers/auth.guard';
import { urls } from './_constants/urls.constant';

const routes: Routes = [
  {
    path: urls.ROOT,
    children: [
      {
        path: urls.ROOT,
        pathMatch: 'full',
        redirectTo: urls.HOME
      },
      {
        path: urls.ACCOUNT,
        loadChildren: () => import('./_modules/account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard]
      },
      {
        path: urls.FAQ,
        loadChildren: () => import('./_modules/faq/faq.module').then(m => m.FaqModule),
      },
      {
        path: urls.HOME,
        loadChildren: () => import('./_modules/home/home.module').then(m => m.HomeModule),
      },
      {
        path: urls.LEGAL,
        loadChildren: () => import('./_modules/legal/legal.module').then(m => m.LegalModule),
      },
      {
        path: '**',
        redirectTo: urls.HOME,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
