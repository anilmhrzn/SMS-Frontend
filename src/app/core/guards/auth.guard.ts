import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {catchError, map, Observable, of} from "rxjs";
import {AuthService} from "../services/authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validateToken().pipe(
      map(isValid => {
        if (isValid) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
