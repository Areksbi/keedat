import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '../../../auth/_store/facades/auth.facades';
import { Observable, Subscription } from 'rxjs';
import { SpinnerFacades } from '../../../_store/facades';
import { AccountService } from '../../_services/account.service';
import { concatMap, first } from 'rxjs/operators';
import { AuthService } from '../../../auth/_services/auth.service';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit, OnDestroy {
  public email$: Observable<string>;
  public isAccountUpdating: boolean = false;
  public isLoading$: Observable<boolean>;
  private deleteAccountSub: Subscription;

  constructor(
    private accountService: AccountService,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private spinnerFacade: SpinnerFacades,
    ) { }

  public ngOnInit() {
    this.isLoading$ = this.spinnerFacade.isLoading();
    this.email$ = this.authFacade.getEmail();
  }

  public ngOnDestroy(): void {
    this.deleteAccountSub.unsubscribe();
  }

  public deleteAccount(): void {
    this.deleteAccountSub = this.authFacade.getUserId()
      .pipe(
        first(Boolean),
        concatMap((id: string) => this.accountService.deleteAccount(id))
      )
      .subscribe(() => this.authService.logout());
  }
}
