import {
  ApplicationConfig,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { CONFIG } from './core/config/config.provider';
import { environment } from '../environments/environment';
import { authInterceptor } from './core/auth/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // No Zone.js
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    { provide: CONFIG, useValue: environment },
  ],
};
