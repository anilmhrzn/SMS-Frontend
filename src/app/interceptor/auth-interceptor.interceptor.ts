import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../core/services/authService/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private router:Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', ` ${authToken}`)
    });
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // if (error.status === 401) {
        //   this.router.navigate(['/login']).then();
        // }
        return throwError(() => new Error(error.message));
      })
    );
  }
}
