import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppSection } from '../../../shared/models/app-sections.enum';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const canActivate = authService.isAuthenticated();
  if (canActivate) {
    return true;
  }
  return router.createUrlTree([AppSection.AUTH]);
};
