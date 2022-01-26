import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { UserService} from "./user/user.service";
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.checkUserLoggedIn()) {
      return next.handle(req);
    }

    const jwtToken = this.userService.getJwtToken();
    const tokenReq = this.signRequestWithToken(req, jwtToken);

    return next.handle(tokenReq).pipe(
      catchError(err => {
        if (err.status === 401) {
          this.userService.logout();
        }
        return throwError(err);
      })
    );
  }

  checkUserLoggedIn() {
    return this.userService.checkUserLoggedIn();
  }

  signRequestWithToken(req: HttpRequest<any>, jwtToken: any) {
    return req.clone({
      headers: req.headers.set('Authorization', `Bearer ${jwtToken}`)
    });
  }
}
