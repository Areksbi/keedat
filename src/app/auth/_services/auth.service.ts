import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { first, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { links } from '../../_constants/links.constant';
import {
  RequestLoginInterface,
  RequestRegistrationInterface,
  ResponseLoginInterface,
  ResponseRegistrationInterface,
} from '../_interfaces/auth.interface';

const BACKEND_URL = `${environment.api}/user/`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated: boolean;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private userId: string;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  public autoAuthUser(): void {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.authStatusListener.next(true);
      this.setAuthTimer(expiresIn / 1000);
    }
  }

  public getAuthStatusListener(): Observable<boolean> {
    return this.authStatusListener.asObservable();
  }

  public getIsAuth(): boolean {
    return this.isAuthenticated;
  }

  public getToken(): string {
    return this.token;
  }

  public login(email: string, password: string, recaptchaToken: string): Observable<ResponseLoginInterface>  {
    const authData: RequestLoginInterface = { email, password, recaptchaToken };
    return this.http.post<ResponseLoginInterface>(`${BACKEND_URL}login`, authData)
      .pipe(
        first((response: ResponseLoginInterface) => !!response.token),
        tap((response: ResponseLoginInterface) => {
          const token = response.token;
          this.token = token;
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.authStatusListener.next(true);
          const now = new Date();
          const expiration = new Date(now.getTime() + expiresInDuration * 1000);
          this.saveAuthData(token, expiration, this.userId);
        })
      );
  }

  public logout(): void {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate([links.HOME]);
  }

  public registration(
    email: string, password: string, consents: boolean, recaptchaToken: string
  ): Observable<ResponseRegistrationInterface> {
    const privacyPolicyConsent = consents;
    const authData: RequestRegistrationInterface = {
      email,
      password,
      privacyPolicyConsent,
      recaptchaToken
    };
    return this.http.post<ResponseRegistrationInterface>(`${BACKEND_URL}registration`, authData);
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token,
      expirationDate: new Date(expirationDate),
      userId
    }
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('userId');
  }

  private saveAuthData(token: any, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
  }

  private setAuthTimer(duration: number): void {
    this.tokenTimer = setTimeout(() => {
      this.logout()
    }, duration * 1000);
  }
}
