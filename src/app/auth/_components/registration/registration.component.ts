import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { concatMap, first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ReCaptchaV3Service } from 'ng-recaptcha';

import { AuthService } from '../../_services/auth.service';
import { links } from '../../../_constants/links.constant';
import { ResponseRegistrationInterface } from '../../_interfaces/auth.interface';
import { SpinnerFacades } from '../../../_store/facades';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public hiddenPassword = true;
  public isLoading$: Observable<boolean>;
  public links = links;
  public registerForm: FormGroup;
  public submitted = false;

  constructor(
    private authService: AuthService,
    private spinnerFacade: SpinnerFacades,
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

    this.isLoading$ = this.spinnerFacade.isLoading();
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.spinnerFacade.showSpinner();

    this.recaptchaV3Service.execute('registration')
      .pipe(
        concatMap((token: string): Observable<ResponseRegistrationInterface> =>
          this.authService.registration(this.f.email.value, this.f.password.value, this.f.consents.value, token)),
        first()
      )
      .subscribe(
        (): void => {
          this.spinnerFacade.hideSpinner();
        },
        (): void => {
          this.spinnerFacade.hideSpinner();
        }
      );
  }

}
