import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from '../_helpers/angular-material.module';
import { FaqContainer } from './faq.container';
import { FaqRoutingModule } from './faq-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FaqContainer
  ],
  imports: [
    AngularMaterialModule,
    CommonModule,
    FaqRoutingModule,
    TranslateModule,
  ],
})
export class FaqModule { }
