import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from "../services/authService/auth.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, private router: Router) {
  }

  canActivate(): boolean {
    // if (!this.authService.isLoggedIn()) {
    //   Swal.fire({
    //     title: 'Access Denied',
    //     text: 'You do not have the required role to access this page',
    //     icon: 'error',
    //     confirmButtonText: 'Logout',
    //     denyButtonText: 'stay logged',
    //   }).then((result) => {
    //     console.log('User does not have the required role to access this page');
    //     if (result.isConfirmed) {
    //       // Swal.fire("Saved!", "", "success");
    //       this.router.navigate(['/login']).then();
    //       return false;
    //     } else if (result.isDenied) {
    //       this.router.navigate(['/dashboard']).then();
    //       return true;
    //       // Swal.fire("Changes are not saved", "", "info");
    //     }
    //     return this.authService.isLoggedIn()
    //     // this.authService.logout();
    //   });
    // }
    return this.authService.isLoggedIn();
}
}
