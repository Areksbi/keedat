import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { finalize } from "rxjs/operators";
import { Observable } from "rxjs";

import { SpinnerFacades } from '../_store/facades';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private spinnerFacade: SpinnerFacades
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerFacade.showSpinner();

    return next.handle(req)
      .pipe(finalize(() => this.spinnerFacade.hideSpinner()));
  }
}
