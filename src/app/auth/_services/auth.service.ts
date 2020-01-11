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

  public registration(email: string, password: string, recaptcha: string): Observable<Object> {
    const authData: AuthInterface = { email, password, recaptcha };
    return this.http.post(BACKEND_URL + 'registration', authData);
  }
}
