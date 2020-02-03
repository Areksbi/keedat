import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { concatMap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';

import { AuthService } from '../../_services/auth.service';
import { ResponseLoginInterface } from '../../_interfaces/auth.interface';
import { SpinnerFacades } from '../../../_store/facades';

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
    private recaptchaV3Service: ReCaptchaV3Service,
    private route: ActivatedRoute,
    private router: Router,
    private spinnerFacade: SpinnerFacades,
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

    this.recaptchaV3Service.execute('login')
      .pipe(
        concatMap((token: string): Observable<ResponseLoginInterface> =>
          this.authService.login(this.f.email.value, this.f.password.value, token)),
        first()
      )
      .subscribe((): void => {
        if (this.returnUrl) {
          this.router.navigate([this.returnUrl]);
        }
      });
  }
}

