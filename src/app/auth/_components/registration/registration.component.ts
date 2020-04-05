import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Observable, Subscription } from 'rxjs';
import { SuccessComponent } from '../../../_components/success/success.component';

import { AuthService } from '../../_services/auth.service';
import { links } from '../../../_constants/links.constant';
import { SpinnerFacades } from '../../../_store/facades';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  public hiddenPassword = true;
  public isLoading$: Observable<boolean>;
  public links = links;
  public registerForm: FormGroup;
  public submitted = false;
  private registrationSub: Subscription;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog,
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

  public ngOnDestroy(): void {
    this.registrationSub.unsubscribe();
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.registrationSub = this.authService.registration(this.f.email.value, this.f.password.value, this.f.consents.value)
      .subscribe((): void => {
        this.dialog.open(SuccessComponent);
      });
  }

}
