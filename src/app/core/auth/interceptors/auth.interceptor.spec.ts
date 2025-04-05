import { TestBed } from '@angular/core/testing';
import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';

import { authInterceptor } from './auth.interceptor';
import { AuthService } from '../auth.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('authInterceptor', () => {
  let authService: jasmine.SpyObj<AuthService>;

  const interceptor: HttpInterceptorFn = (req, next) =>
    TestBed.runInInjectionContext(() => authInterceptor(req, next));

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getToken']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: AuthService, useValue: authServiceSpy },
      ],
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should add Authorization header if token is present', () => {
    const token = 'test-token';
    authService.getToken.and.returnValue(token);

    const req = new HttpRequest('GET', 'url');
    const expectedReq = req.clone({
      headers: req.headers.append('Authorization', `Bearer ${token}`),
    });
    const next = jasmine.createSpy('next');

    interceptor(req, next);

    expect(next).toHaveBeenCalledWith(expectedReq);
  });

  it('should not add Authorization header if token is not present', () => {
    authService.getToken.and.returnValue(null);

    const req = new HttpRequest('GET', 'url');
    const next = jasmine.createSpy('next');

    interceptor(req, next);

    expect(req.headers.get('Authorization')).toBeFalsy();
    expect(next).toHaveBeenCalledWith(req);
  });
});
