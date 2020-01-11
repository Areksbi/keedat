import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthInterface } from '../_interfaces/auth.interface';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

const BACKEND_URL = `${environment.api}/user/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
  ) { }

  public registration(email: string, password: string, consents: boolean, recaptchaToken: string): Observable<Object> {
    const privacyPolicyConsent = consents;
    const userAgreementConsent = consents;
    const authData: AuthInterface = { email, password, privacyPolicyConsent, userAgreementConsent, recaptchaToken };
    return this.http.post(BACKEND_URL + 'registration', authData);
  }
}
