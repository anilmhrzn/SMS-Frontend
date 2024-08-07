import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../../services/authService/auth.service";
import {inject} from '@angular/core';
import Swal from 'sweetalert2';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['ROLE_REQUIRED'];
  const authService = inject(AuthService);
  const router = inject(Router);
  const user = authService.getUser();
  console.log('user');
  if (user && user.roles && user.roles.includes(expectedRole)) {
    console.log('sdfjl');
    return true;
  } else {
    authService.logUnauthorizedAccess(state.url);
    let confirmButtonText = 'Login as User';
    if(authService.hasRole('ROLE_USER')){
      confirmButtonText = 'Login as admin';
    }
    Swal.fire({
      title: 'Access Denied',
      text: 'You do not have the required role to access this page',
      icon: 'error',
      confirmButtonText: confirmButtonText,
      showCancelButton: true,
      cancelButtonText: 'Go to dashboard',
    }).then((result) => {
      if(result.isConfirmed) {
        authService.logout();
        router.navigate(['/login']).then();
      }else{
        router.navigate(['/dashboard']).then();
      }
    });
    return false;
  }
};
