import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);
  
  const token = authService.readToken();

  if (token && token.access) {
      return true; 
    } else {
      router.navigate(['']);
      return false; 
    }
};