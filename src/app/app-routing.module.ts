import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth/_helpers/auth.guard';
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
        loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
        canActivate: [AuthGuard]
      },
      {
        path: urls.HOME,
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule),
      },
      {
        path: urls.LEGAL,
        loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
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
