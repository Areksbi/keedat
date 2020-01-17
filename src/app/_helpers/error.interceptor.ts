import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

import { ErrorComponent } from '../_components';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private dialog: MatDialog
  ) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          const errorMessage = error.error && error.error.message;
          this.dialog.open(ErrorComponent, { data: { message: errorMessage }});
          return throwError(error);
        })
      );
  }
}
