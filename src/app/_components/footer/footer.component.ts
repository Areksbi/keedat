import { Component } from '@angular/core';
import { links } from '../../_constants/links.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  public currentYear: number = new Date().getFullYear();
  public links = links;
}
