import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';


const BACKEND_URL = `${environment.api}/user/`;

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(
    private http: HttpClient,
  ) { }

  public deleteAccount(id: string) {
    return this.http.delete(`${BACKEND_URL}delete/${id}`);
  }
}
