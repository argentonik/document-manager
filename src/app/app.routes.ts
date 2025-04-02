import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { guestGuard } from './core/auth/guards/guest.guard';
import { AppSection } from './shared/models/app-sections.enum';

export const routes: Routes = [
  {
    path: AppSection.AUTH,
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: 'sign-up',
        component: SignUpComponent,
      },
      {
        path: 'sign-in',
        component: SignInComponent,
      },
      {
        path: '**',
        redirectTo: 'sign-in',
      },
    ],
  },
  {
    path: AppSection.MAIN,
    component: MainLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
