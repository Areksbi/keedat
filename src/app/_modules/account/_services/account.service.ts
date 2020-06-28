import { Injectable } from '@angular/core';

import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestResponseUpdateAccount } from '../_interfaces/account.interface';


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

  public updateAccount(id: string, body: RequestResponseUpdateAccount) {
    return this.http.put(`${BACKEND_URL}update/${id}`, body);
  }
}
