import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthFacade } from '../../../auth/_store/facades/auth.facades';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { SpinnerFacades } from '../../../_store/facades';
import { AccountService } from '../../_services/account.service';
import { concatMap, first, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../auth/_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mustNotMatchIfNotEmpty } from '../../../_helpers/must-not-match.validator';
import { RequestUpdateAccount } from '../../_interfaces/account.interface';
import { requestUpdateUser } from '../../../auth/_store/actions/auth.actions';
import { Store } from '@ngrx/store';
import { State } from '../../../_store/reducers';

@Component({
  selector: 'app-account-overview',
  templateUrl: './account-overview.component.html',
  styleUrls: ['./account-overview.component.scss']
})
export class AccountOverviewComponent implements OnInit, OnDestroy {
  public hiddenPassword: boolean = true;
  public hiddenNewPassword: boolean = true;
  public isAccountUpdating: boolean = false;
  public isLoading$: Observable<boolean>;
  public updateForm: FormGroup;
  private readonly onDestroy$ = new Subject<boolean>();

  constructor(
    private accountService: AccountService,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private spinnerFacade: SpinnerFacades,
    private store: Store<State>,
  ) { }

  public ngOnInit() {
    this.isLoading$ = this.spinnerFacade.isLoading();
    this.updateForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.minLength(8)],
      newPassword: ['', Validators.minLength(8)]
    }, {
      validator: mustNotMatchIfNotEmpty('password', 'newPassword')
    });
    this.authFacade.getEmail()
      .pipe(
        takeUntil(this.onDestroy$)
      )
      .subscribe((email: string) => this.updateForm.controls['email'].setValue(email));
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.unsubscribe();
  }

  public deleteAccount(): void {
    this.authFacade.getUserId()
      .pipe(
        takeUntil(this.onDestroy$),
        first(Boolean),
        concatMap((id: string) => this.accountService.deleteAccount(id))
      )
      .subscribe(() => this.authService.logout());
  }

  public updateAccount() {
    if (this.updateForm.invalid || !this.updateForm.dirty)  {
      return;
    }

    this.authFacade.getEmail()
      .pipe(
        takeUntil(this.onDestroy$),
        first(Boolean),
        concatMap((email: string) =>
          combineLatest([
              of(email),
              of(this.updateForm.get('email')),
              of(this.updateForm.get('password')),
              of(this.updateForm.get('newPassword')),
            ],
          )),
        first(([email, emailControl, password, newPassword]) =>
          (emailControl.value && emailControl.value !== email)
          || (password.value && newPassword.value && password.value !== newPassword.value)),
        concatMap(([email, emailControl, password, newPassword]) => {
          const body: RequestUpdateAccount = {
            email: emailControl.value !== email && emailControl.value || null,
            password: password.value || null,
            newPassword: newPassword.value || null
          };

          const hasProperties: boolean = Object.keys(body).map((key: string) => !body[key] && delete body[key]).length > 0;

          if (hasProperties) {
            return combineLatest([
              this.authFacade.getUserId().pipe(first(Boolean)),
              of(body)
            ]);
          }
        }),
      )
      .subscribe(([id, body]) => {
        this.store.dispatch(requestUpdateUser({ id, body }));
        this.isAccountUpdating = false
      })
  }
}
