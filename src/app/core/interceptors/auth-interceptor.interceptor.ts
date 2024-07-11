import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  // return next(req);
  const authToken=localStorage.getItem('AuthToken');
  const authReq=req.clone({
    setHeaders:{
      Authorization: `Bearer ${authToken}`
    }
  })
  return next(authReq);
};
