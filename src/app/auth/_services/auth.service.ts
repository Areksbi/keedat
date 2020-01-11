import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { RequestRegistrationInterface, ResponseRegistrationInterface } from '../_interfaces/auth.interface';
import { environment } from '../../../environments/environment';

const BACKEND_URL = `${environment.api}/user/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) {
  }

  public registration(
    email: string, password: string, consents: boolean, recaptchaToken: string
  ): Observable<ResponseRegistrationInterface> {
    const privacyPolicyConsent = consents;
    const userAgreementConsent = consents;
    const authData: RequestRegistrationInterface = {
      email,
      password,
      privacyPolicyConsent,
      userAgreementConsent,
      recaptchaToken
    };
    return this.http.post<ResponseRegistrationInterface>(BACKEND_URL + 'registration', authData);
  }

}
