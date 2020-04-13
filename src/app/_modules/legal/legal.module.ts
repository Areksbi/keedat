import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LegalRoutingModule } from './legal-routing.module';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
  declarations: [
    PrivacyPolicyComponent,
  ],
  imports: [
    CommonModule,
    LegalRoutingModule,
  ],
})
export class LegalModule {
}
