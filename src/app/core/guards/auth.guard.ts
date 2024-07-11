import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth-pages/services/auth-service';

export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  if(inject(AuthService).isAuthenticatedUser())
  {
    return true;
  }
  else{
    inject(Router).navigate(['/login']);
    return false;
  }
};
