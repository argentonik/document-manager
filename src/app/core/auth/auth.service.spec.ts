import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CONFIG } from '../config/config.provider';

let authService: AuthService;
let httpClient: jasmine.SpyObj<HttpClient>;
let router: jasmine.SpyObj<Router>;

describe('AuthService', () => {
  const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
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
});
