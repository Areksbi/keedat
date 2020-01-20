import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FaqContainer } from './faq.container';

const routes: Routes = [
  {
    path: '',
    component: FaqContainer,
  }
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class FaqRoutingModule { }
