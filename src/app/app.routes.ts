import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { SignUpComponent } from './features/auth/sign-up/sign-up.component';
import { SignInComponent } from './features/auth/sign-in/sign-in.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { guestGuard } from './core/auth/guards/guest.guard';
import { AppSection } from './shared/models/enums/app-section.enum';
import { AuthSection } from './shared/models/enums/auth-section.enum';
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
    path: AppSection.DOCUMENTS,
    component: MainLayoutComponent,
    canActivate: [authGuard],
    resolve: {
      user: userResolver,
    },
    children: [
      {
        path: '',
        loadComponent: () =>
          import(
            './features/documents/views/documents/documents.component'
          ).then((c) => c.DocumentsComponent),
      },
      {
        path: `create`,
        loadComponent: () =>
          import(
            './features/documents/views/document-create/document-create.component'
          ).then((c) => c.DocumentCreateComponent),
      },
      {
        path: `edit/:id`,
        loadComponent: () =>
          import(
            './features/documents/views/document-detail/document-detail.component'
          ).then((c) => c.DocumentDetailComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '**',
    redirectTo: AppSection.DOCUMENTS,
  },
];
