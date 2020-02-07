import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';

import { AuthService } from '../../_services/auth.service';
import { links } from '../../../_constants/links.constant';
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

    this.authService.registration(this.f.email.value, this.f.password.value, this.f.consents.value)
      .subscribe((): void => {
        console.log('Registered');
      });
  }

}
