import { TestBed } from '@angular/core/testing';

import { AuthService, TOKEN_KEY } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CONFIG } from '../config/config.provider';
import { of } from 'rxjs';
import { AppSection } from '../../shared/models/enums/app-section.enum';
import { SignInRes } from './models/sign-in-res.interface';
import { SignUpReq } from './models/sign-up-req.interface';
import { User } from './models/user.interface';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const mockConfig = {
    apiUrl: 'http://localhost:3000',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: CONFIG, useValue: mockConfig }],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return true if the user is authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mock_token');
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return false if the user is not authenticated', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should save token on login', () => {
    const mockResponse: SignInRes = { access_token: 'mock_token' };
    spyOn(localStorage, 'setItem');
    service
      .login({ email: 'test@example.com', password: 'password' })
      .subscribe();
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
    expect(localStorage.setItem).toHaveBeenCalledWith(TOKEN_KEY, 'mock_token');
  });

  it('should call the register endpoint', () => {
    const mockData: Partial<SignUpReq> = {
      email: 'test@example.com',
      password: 'password',
    };
    service.register(mockData).subscribe();
    const req = httpMock.expectOne(`${mockConfig.apiUrl}/user/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockData);
  });

  it('should fetch the current user if not cached', () => {
    const mockUser: User = {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
    };
    spyOn(service['http'], 'get').and.returnValue(of(mockUser));
    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });
    expect(service['http'].get).toHaveBeenCalledWith(
      `${mockConfig.apiUrl}/user`,
    );
  });

  // it('should return cached user if available', () => {
  //   const mockUser: User = { id: 1, name: 'John Doe', email: 'john@example.com' };
  //   service['user'] = of(mockUser);
  //   service.getCurrentUser().subscribe((user) => {
  //     expect(user).toEqual(mockUser);
  //   });
  // });

  it('should clear token and navigate on logout', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(service['router'], 'navigate');
    service.logout();
    expect(localStorage.removeItem).toHaveBeenCalledWith(TOKEN_KEY);
    expect(service['router'].navigate).toHaveBeenCalledWith([AppSection.AUTH]);
  });
});
