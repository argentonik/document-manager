import { IsGrantedDirective } from './is-granted.directive';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '../auth.service';
import {
  provideExperimentalZonelessChangeDetection,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';

describe('IsGrantedDirective', () => {
  let directive: IsGrantedDirective;
  let authService: AuthService;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        ViewContainerRef,
        TemplateRef,
        { provide: AuthService, useValue: authServiceSpy },
        {
          provide: 'CONFIG',
          useValue: {
            apiUrl: 'http://localhost:3000',
          },
        },
      ],
    });

    directive = TestBed.runInInjectionContext(() => new IsGrantedDirective());
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
