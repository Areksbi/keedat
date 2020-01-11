import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { concatMap, first } from 'rxjs/operators';

import { AuthService } from '../../_services/auth.service';
import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  public hiddenPassword = true;
  public isLoading = false;
  public registerForm: FormGroup;
  public submitted = false;

  constructor(
    private authService: AuthService,
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
      })
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.recaptchaV3Service.execute('registration')
      .pipe(
        concatMap((token: string) =>
          this.authService.registration(this.f.email.value, this.f.password.value, token)),
        first()
      )
      .subscribe(
        (data) => {
          console.log(data)
        },
        error => {
          console.log('fail')
        }
      );
  }

}
