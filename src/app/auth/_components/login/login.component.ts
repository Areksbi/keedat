import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public isLoading = false;
  public loginForm: FormGroup;
  public submitted = false;

  constructor(
  ) {
  }

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, {
        validators: [
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
  }
}

