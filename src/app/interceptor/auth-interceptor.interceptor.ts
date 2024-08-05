import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {AuthService} from "../core/services/authService/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', ` ${authToken}`)
    });
    return next.handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            const message = error.error.message;
            Swal.fire(
              {
                title: message,
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'OK',
              }
            ).then(r => {
              this.authService.logout()
              this.router.navigate(['/login']).then();
              return of()
            })
          }
          return throwError(()=>error);
        })
      );
  }
}
