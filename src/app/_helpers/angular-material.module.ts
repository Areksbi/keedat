import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';

@NgModule({
  exports: [
    MatGridListModule,
    MatToolbarModule,
  ]
})
export class AngularMaterialModule {

}
