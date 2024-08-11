import {Injectable} from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse} from '@angular/common/http';
import {catchError, Observable, of, throwError} from 'rxjs';
import {AuthService} from "../core/services/authService/auth.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private snackbar:MatSnackBar,private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', ` ${authToken}`)
    });
    console.log(authReq)
    return next.handle(authReq)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.log(error.status)
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
          }else if(error.status === 500){
            this.snackbar.open('An error occurred,we are already working on it', 'Close', {duration: 2000});

          }

          return throwError(()=>error);
        })
      );
  }
}
