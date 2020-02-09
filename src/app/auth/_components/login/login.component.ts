import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { filter, first } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from '../../_services/auth.service';
import { requestLogin } from '../../_store/actions/auth.actions';
import { SpinnerFacades } from '../../../_store/facades';
import { State } from '../../../_store/reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hiddenPassword: boolean = true;
  public isLoading$: Observable<boolean>;
  public loginForm: FormGroup;
  public submitted: boolean = false;

  private returnUrl: string;
  private routerEventsSub: Subscription;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerFacade: SpinnerFacades,
    private store: Store<State>
  ) {
  }

  get f(): { [key: string] : AbstractControl } { return this.loginForm.controls; }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.email,
          Validators.required
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required
        ]
      }),
    });

    const returnUrlKey = 'returnUrl';
    this.routerEventsSub = this.router.events
      .pipe(
        filter((val: RouterEvent) => val instanceof NavigationEnd),
        first((val: RouterEvent) => val.url && val.url.includes(returnUrlKey))
      )
      .subscribe(() => {
        this.returnUrl = this.route.snapshot.queryParams[returnUrlKey];
      });

    this.isLoading$ = this.spinnerFacade.isLoading();
  }


  public onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    this.store.dispatch(requestLogin({
      email: this.f.email.value,
      password: this.f.password.value,
      returnUrl: this.returnUrl
    }));
  }
}

