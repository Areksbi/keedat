import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { getIsAuth } from '../selectors/auth.selectors';
import { State } from '../../../_store/reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {

  constructor(
    private store: Store<State>
  ) { }

  public getIsAuth(): Observable<boolean> {
    return this.store.pipe(
      select(getIsAuth)
    );
  }

}
