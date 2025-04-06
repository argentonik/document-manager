import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Handle 401 error
        console.error('Unauthorized request:', err);
        authService.logout();
      }
      throw err;
    }),
  );
};
