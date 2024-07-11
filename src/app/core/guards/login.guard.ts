import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../modules/auth-pages/services/auth-service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  if(inject(AuthService).isAuthenticatedUser())
  {
    inject(Router).navigate(['/dashboard']);
    return false;
  }
  else{
    return true;
  }
};
