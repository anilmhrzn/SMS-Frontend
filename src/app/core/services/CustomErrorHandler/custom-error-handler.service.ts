import {ErrorHandler, Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class CustomErrorHandlerService implements ErrorHandler{

  constructor(private snackbar:MatSnackBar) { }

  handleError(error: unknown): void {
    // this.snackbar.open('An error occurred,we are already working on it', 'Close', {duration: 2000});
    // console.warn('Caught by custom error handler',error)
    }
}
