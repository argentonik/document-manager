import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { guestGuard } from './core/auth/guards/guest.guard';
import { AppSection } from './shared/models/app-section.enum';
import { AuthSection } from './shared/models/auth-section.enum';
import { userResolver } from './core/auth/resolvers/user.resolver';

export const routes: Routes = [
  {
    path: AppSection.AUTH,
    component: AuthLayoutComponent,
    canActivate: [guestGuard],
    children: [
      {
        path: AuthSection.SIGN_UP,
        component: SignUpComponent,
      },
      {
        path: AuthSection.SIGN_IN,
        component: SignInComponent,
      },
      {
        path: '**',
        redirectTo: AuthSection.SIGN_IN,
      },
    ],
  },
  {
    path: AppSection.MAIN,
    component: MainLayoutComponent,
    canActivate: [authGuard],
    resolve: {
      user: userResolver,
    },
    children: [
      {
        path: AppSection.DOCUMENTS,
        loadComponent: () =>
          import('./features/documents/documents.component').then(
            (c) => c.DocumentsComponent,
          ),
      },
      {
        path: AppSection.DOCUMENT_DETAIL,
        loadComponent: () =>
          import('./features/document-detail/document-detail.component').then(
            (c) => c.DocumentDetailComponent,
          ),
      },
      {
        path: '**',
        redirectTo: AppSection.DOCUMENTS,
      },
    ],
  },
];
