import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeContainer } from './home.container';

const routes: Routes = [
  {
    path: '',
    component: HomeContainer,
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class HomeRoutingModule { }
