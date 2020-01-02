import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReCaptchaV3Service } from 'ng-recaptcha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public hiddenPassword = true;
  public isLoading = false;
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
  ) {
  }

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
      })
    });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) { return; }

    this.isLoading = true;
    this.recaptchaV3Service.execute('login')
      .subscribe((token: string) => console.log(token));
  }
}

