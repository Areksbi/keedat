import { Component, OnInit } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.container.html',
  styleUrls: ['./faq.container.scss']
})
export class FaqContainer {
  public unfoldMore: boolean = true;

  public toggleUnfolding(accordion: MatAccordion): void {
    if (this.unfoldMore) {
      accordion.openAll();
    } else {
      accordion.closeAll();
    }
    this.unfoldMore = !this.unfoldMore;
  }
}
