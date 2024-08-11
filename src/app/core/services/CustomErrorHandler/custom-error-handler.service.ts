import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../authService/auth.service";
import {HttpErrorResponse} from "@angular/common/http";
import {log} from "@angular-devkit/build-angular/src/builders/ssr-dev-server";

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler{

  constructor(private snackbar:MatSnackBar,private injector: Injector) { }

  handleError(error: unknown): void {
    // console.log(error)
    // this.snackbar.open('An error occurred,we are already working on it', 'Close', {duration: 2000});
    // console.warn('Caught by custom error handler',error)
    const router = this.injector.get(Router);
    const authService = this.injector.get(AuthService);
    // console.log(typeof (error))
    // console.log(error)
    // console.log(error)
    // console.log(JSON.stringify(error))
    if (error instanceof HttpErrorResponse) {
      // console.log('eta')
      // Server or connection error
      if (error.status === 401) {
        // Unauthorized error
        console.log('Unauthorized error')
        // authService.logout();


        // router.navigate(['/login']);
        return ;
      }
    } else {
      this.snackbar.open('An error occurred,we are already working on it! Please try again later', 'Close', {duration: 2000});
      // console.log('toir')
      // Client-side error
      // console.error('Client error:', error.message);
      // alert(`Client error: ${error.message}`);
    }
    }
}
