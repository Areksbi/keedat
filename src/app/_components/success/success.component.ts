import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  templateUrl: './success.component.html'
})
export class SuccessComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {
  }
}
