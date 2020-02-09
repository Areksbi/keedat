import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeContainer } from './home.container';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [
    HomeContainer,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
