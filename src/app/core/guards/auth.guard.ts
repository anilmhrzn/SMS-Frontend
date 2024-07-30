import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/authService/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    // console.log('AuthGuard#canActivate called');
    return this.authService.isLoggedIn();
  }
}
