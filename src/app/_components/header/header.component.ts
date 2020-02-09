import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { links } from '../../_constants/links.constant';
import { AuthService } from '../../auth/_services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public links = links;
  public userIsAuthenticated: boolean;
  private authListenerSubs: Subscription;

  constructor(
    private authService: AuthService
  ) {
  }

  public ngOnInit(): void {
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  public ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }

  public onLogout(): void {
    this.authService.logout();
  }

}
