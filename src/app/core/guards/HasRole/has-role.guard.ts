import {CanActivateFn} from '@angular/router';
import {AuthService} from "../../services/authService/auth.service";
import {inject} from '@angular/core';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const expectedRole = route.data['ROLE_REQUIRED'];
  const authService = inject(AuthService);
  const user = authService.getUser();
  return !!(user && user.roles && user.roles.includes(expectedRole));
};
