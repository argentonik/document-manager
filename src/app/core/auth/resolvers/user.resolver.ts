import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { delay, Observable } from 'rxjs';
import { User } from '../models/user.interface';

export const userResolver: ResolveFn<Observable<User>> = (route, state) => {
  const authService = inject(AuthService);
  return authService.getCurrentUser().pipe(delay(1000));
};
