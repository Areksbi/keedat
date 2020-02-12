import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { first, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { environment } from '../../../environments/environment';
import { links } from '../../_constants/links.constant';
import { logout } from '../_store/actions/auth.actions';
import {
  RequestLoginInterface,
  RequestRegistrationInterface,
  ResponseLoginInterface,
  ResponseRegistrationInterface,
} from '../_interfaces/auth.interface';
import { State } from '../../_store/reducers';


const BACKEND_URL = `${environment.api}/user/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<State>,
  ) {
  }

  public autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = new Date(authInformation.expirationDate).getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  public getToken(): string {
    return this.token;
  }

  public login(request: RequestLoginInterface): Observable<ResponseLoginInterface>  {
    return this.http.post<ResponseLoginInterface>(`${BACKEND_URL}login`, request)
      .pipe(
        first((response: ResponseLoginInterface) => !!response.token),
        tap((response: ResponseLoginInterface) => {
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.userId = response.userId;
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresInDuration * 1000).toISOString();
          this.saveAuthData(response.email, expiration, token, this.userId);
        })
      );
  }

  public logout(): void {
    this.token = null;
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.store.dispatch(logout());
    this.router.navigate([links.HOME]);
  }

  public registration(email: string, password: string, consents: boolean): Observable<ResponseRegistrationInterface> {
    const privacyPolicyConsent = consents;
    const authData: RequestRegistrationInterface = {
      email,
      password,
      privacyPolicyConsent,
    };
    return this.http.post<ResponseRegistrationInterface>(`${BACKEND_URL}registration`, authData);
  }

  public getAuthData() {
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      email,
      expirationDate: new Date(expirationDate).toISOString(),
      token,
      userId
    }
  }

  private clearAuthData() {
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private saveAuthData(email: string, expirationDate: string, token: string, userId: string) {
    localStorage.setItem('email', email);
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate);
    localStorage.setItem('userId', userId);
  }

  private setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }
}
