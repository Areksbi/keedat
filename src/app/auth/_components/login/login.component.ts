import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
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

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
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
    }));

    if (this.returnUrl) {
      this.router.navigate([this.returnUrl]);
    }
  }
}

