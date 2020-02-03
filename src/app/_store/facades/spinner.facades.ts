import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { getIsLoading } from '../selectors';
import { hideSpinner, showSpinner } from '../actions';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class SpinnerFacades {

  constructor(
    private store: Store<State>
  ) {
  }

  isLoading(): Observable<boolean> {
    return this.store.pipe(
      select(getIsLoading)
    );
  }

  hideSpinner(): void {
    setTimeout(() => {
      this.store.dispatch(hideSpinner());
    }, 300);
  }

  showSpinner(): void {
    this.store.dispatch(showSpinner());
  }
}
