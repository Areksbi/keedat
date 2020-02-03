import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { concatMap, finalize, first } from "rxjs/operators";
import { Observable } from "rxjs";
import { ReCaptchaV3Service } from 'ng-recaptcha';

import { SpinnerFacades } from '../_store/facades';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private recaptchaV3Service: ReCaptchaV3Service,
    private spinnerFacade: SpinnerFacades,
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerFacade.showSpinner();

    return this.recaptchaV3Service.execute(req.body.type)
      .pipe(
        first(Boolean),
        concatMap((token: string): Observable<any> => {
          const reqCloned = this.addRecaptchaToken(req, token);
          return next.handle(reqCloned)
            .pipe(finalize(() => this.spinnerFacade.hideSpinner()));
        })
      );
  }

  private addRecaptchaToken(req: HttpRequest<any>, token): HttpRequest<any> {
    const tokenName = 'recaptchaToken';

    switch (req.method.toLowerCase()) {
      case 'get':
        return req.clone({
          params: req.params.set(tokenName, tokenName)
        });

      case 'post':
        if (req.body instanceof FormData) {
          return req.clone({
            body: req.body.append(tokenName, token)
          })
        }

        return req.clone({
          body: {...req.body, [tokenName]: token }
        });

      default:
        return req;
    }
  }
}
