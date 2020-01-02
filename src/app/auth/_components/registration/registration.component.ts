import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
  ) {
  }

  ngOnInit() {
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

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    this.isLoading = true;
  }

}
