import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable } from 'rxjs';
import { concatMap, finalize, first, map } from 'rxjs/operators';
import { EncryptionService } from '../_services/encryption.service';

import { SpinnerFacades } from '../_store/facades';

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  constructor(
    private encryptionService: EncryptionService,
    private recaptchaV3Service: ReCaptchaV3Service,
    private spinnerFacade: SpinnerFacades
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinnerFacade.showSpinner();

    const action = req.url.replace(/^.*\/\/[^\/]+/, '');
    return this.recaptchaV3Service.execute(action).pipe(
      first(Boolean),
      concatMap(
        (token: string): Observable<any> => {
          const reqCloned = this.addRecaptchaToken(req, token);
          return this.encryptionService.encrypt(JSON.stringify(reqCloned.body)).pipe(
            map(encryptedTex =>
              reqCloned.clone({
                body: encryptedTex,
              })
            )
          );
        }
      ),
      concatMap(reqClonedAndEncrypted => next.handle(reqClonedAndEncrypted).pipe(finalize(() => this.spinnerFacade.hideSpinner())))
    );
  }

  private addRecaptchaToken(req: HttpRequest<any>, token): HttpRequest<any> {
    const tokenName = 'recaptchaToken';

    switch (req.method.toLowerCase()) {
      case 'delete':
      case 'get':
        return req.clone({
          params: req.params.set(tokenName, token),
        });

      case 'post':
      case 'put':
        if (req.body instanceof FormData) {
          return req.clone({
            body: req.body.append(tokenName, token),
          });
        }

        return req.clone({
          body: { ...req.body, [tokenName]: token },
        });

      default:
        return req;
    }
  }
}
