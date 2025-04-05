import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { of, throwError } from 'rxjs';

@Component({
  template: '',
})
class DummyComponent {}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<SnackBarService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
      'error',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([
          { path: '', component: DummyComponent },
          {
            path: 'auth/sign-up',
            component: DummyComponent,
          },
        ]),
        FormBuilder,
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
        { provide: SnackBarService, useValue: snackBarServiceSpy },
      ],
      imports: [SignInComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(
      SnackBarService,
    ) as jasmine.SpyObj<SnackBarService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('show pending state when signUp is called', () => {
    component.signInForm.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    authService.login.and.returnValue(of({ access_token: 'token' }));

    component.signUp();

    expect(component.pending()).toBeTrue();
  });

  it('should show error message on login failure', () => {
    component.signInForm.setValue({
      email: 'test@example.com',
      password: 'password',
    });
    authService.login.and.returnValue(
      throwError(() => new Error('Invalid email or password')),
    );

    component.signUp();

    expect(component.pending()).toBeFalse();
    expect(snackBar.error).toHaveBeenCalled();
  });

  it('should not call login if form is invalid', () => {
    component.signInForm.setValue({ email: '', password: '' });

    component.signUp();

    expect(authService.login).not.toHaveBeenCalled();
  });
});
