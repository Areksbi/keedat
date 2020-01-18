import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {
  private spinnerListener = new Subject<boolean>();
  private _spinnerCount: number = 0;

  public get isLoading() {
    return this._spinnerCount > 0;
  }

  public get isLoadingListener(): Observable<boolean> {
    return this.spinnerListener.asObservable();
  }

  public showSpinner(): void {
    this._spinnerCount++;
    this.spinnerListener.next(this.isLoading);
  }

  public hideSpinner(): void {
    setTimeout(() => {
      this._spinnerCount--;
      this.spinnerListener.next(this.isLoading);
    }, 300);
  }
}
