import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { UserService} from "./user/user.service";
import { catchError } from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.checkUserLoggedIn()) {
      return next.handle(req);
    }

    const jwtToken = this.userService.getJwtToken();
    const tokenReq = this.signRequestWithToken(req, jwtToken);

    return next.handle(tokenReq).pipe(
      catchError(err => {
        if (err instanceof HttpErrorResponse && err.status === 401) {
          this.userService.logout();
          this.router.navigate(['/login'])
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
