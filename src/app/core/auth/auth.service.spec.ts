import { TestBed } from '@angular/core/testing';

import { AuthService, TOKEN_KEY } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CONFIG } from '../config/config.provider';
import { SignInRes } from './models/sign-in-res.interface';
import { of } from 'rxjs';
import { User } from './models/user.interface';
import { AppSection } from '../../shared/models/enums/app-section.enum';
import { UserRole } from './models/user-role.enum';

let authService: AuthService;
let httpClient: jasmine.SpyObj<HttpClient>;
let router: jasmine.SpyObj<Router>;

describe('AuthService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        AuthService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: CONFIG,
          useValue: {
            apiUrl: 'http://localhost:3000',
          },
        },
      ],
    });
    authService = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should return true if the user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('test-token');
    expect(authService.isAuthenticated()).toBeTrue();
  });

  it('should return false if the user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(authService.isAuthenticated()).toBeFalse();
  });

  it('should save token on login', (done) => {
    const signInRes: SignInRes = { access_token: 'test-token' };
    httpClient.post.and.returnValue(of(signInRes));
    spyOn(localStorage, 'setItem');

    authService.login({ email: 'test', password: 'test' }).subscribe(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith(
        TOKEN_KEY,
        'test-token',
      );
      done();
    });
  });

  it('should return user from getCurrentUser if user is set', () => {
    const user: User = {
      id: '1',
      fullName: 'John Doe',
      email: 'email',
      role: UserRole.USER,
    };
    authService['_user'].set(user);

    authService.getCurrentUser().subscribe((result) => {
      expect(result).toEqual(user);
    });
  });

  it('should fetch and set user on getCurrentUser if user is not set', () => {
    const user: User = {
      id: '1',
      fullName: 'John Doe',
      email: 'email',
      role: UserRole.USER,
    };
    httpClient.get.and.returnValue(of(user));

    authService.getCurrentUser().subscribe((result) => {
      expect(result).toEqual(user);
      expect(authService.user()).toEqual(user);
    });
  });

  it('should remove token and navigate to auth section on logout', () => {
    spyOn(localStorage, 'removeItem');
    authService.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(router.navigate).toHaveBeenCalledWith([AppSection.AUTH]);
  });
});
