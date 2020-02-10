import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { links } from '../../_constants/links.constant';
import { AuthService } from '../../auth/_services/auth.service';
import { AuthFacade } from '../../auth/_store/facades/auth.facades';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public links = links;
  public userIsAuthenticated$: Observable<boolean>;

  constructor(
    private authFacade: AuthFacade,
    private authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.userIsAuthenticated$ = this.authFacade.getIsAuth();
  }

  public onLogout(): void {
    this.authService.logout();
  }

}
