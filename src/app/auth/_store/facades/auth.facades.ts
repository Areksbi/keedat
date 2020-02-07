import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { AuthStateInterface } from '../reducers/auth.reducer';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(
    private store: Store<AuthStateInterface>
  ) { }

}
