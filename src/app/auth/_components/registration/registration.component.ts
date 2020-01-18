import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { concatMap, first } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from '../../_services/auth.service';
import { links } from '../../../_constants/links.constant';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ResponseRegistrationInterface } from '../../_interfaces/auth.interface';
import { SpinnerService } from '../../../_services/spinner.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public hiddenPassword = true;
  public isLoading = false;
  public links = links;
  public registerForm: FormGroup;
  public submitted = false;

  private isLoadingSub: Subscription;

  constructor(
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

  get f(): { [key: string] : AbstractControl } { return this.registerForm.controls; }

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
          Validators.email,
          Validators.required
        ]
      }),
      password: new FormControl(null, {
        validators: [
          Validators.minLength(8),
          Validators.required
        ]
      }),
      consents: new FormControl(false, {
        validators: [
          Validators.requiredTrue
        ]
      }),
    });

    this.isLoading = this.spinnerService.isLoading;
    this.isLoadingSub = this.spinnerService.isLoadingListener
      .subscribe((isLoading: boolean) => this.isLoading = isLoading);
  }

  public ngOnDestroy(): void {
    this.isLoadingSub.unsubscribe();
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.spinnerService.showSpinner();
    this.recaptchaV3Service.execute('registration')
      .pipe(
        concatMap((token: string): Observable<ResponseRegistrationInterface> =>
          this.authService.registration(this.f.email.value, this.f.password.value, this.f.consents.value, token)),
        first()
      )
      .subscribe(
        (): void => {
          this.spinnerService.hideSpinner();
        },
        (): void => {
          this.spinnerService.hideSpinner();
        }
      );
  }

}
