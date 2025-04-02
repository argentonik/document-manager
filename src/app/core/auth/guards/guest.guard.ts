import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppSection } from '../../../shared/models/enums/app-section.enum';

export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const canActivate = !authService.isAuthenticated();
  if (canActivate) {
    return true;
  }
  return router.createUrlTree([AppSection.MAIN]);
};
