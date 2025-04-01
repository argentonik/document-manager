import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
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
    path: '',
    component: MainLayoutComponent,
  },
];
