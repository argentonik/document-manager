import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpComponent } from './sign-up.component';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthService } from '../../../core/auth/auth.service';
import { NonNullableFormBuilder } from '@angular/forms';
import { SnackBarService } from '../../../core/services/snack-bar.service';
import { UserRole } from '../../../core/auth/models/user-role.enum';
import { of, throwError } from 'rxjs';

@Component({
  template: '',
})
class DummyComponent {}

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<SnackBarService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    const snackBarSpy = jasmine.createSpyObj('SnackBarService', ['error']);

    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([
          {
            path: 'auth/sign-in',
            component: DummyComponent,
          },
        ]),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: SnackBarService, useValue: snackBarSpy },
        NonNullableFormBuilder,
      ],
      imports: [SignUpComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    snackBar = TestBed.inject(
      SnackBarService,
    ) as jasmine.SpyObj<SnackBarService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(' show pending state when signUp is called', () => {
    component.signUpForm.setValue({
      fullName: 'John Doe',
      email: 'test@example.com',
      password: 'password',
      role: UserRole.USER,
    });
    authService.register.and.returnValue(of({}));

    component.signUp();

    expect(component.pending()).toBeTrue();
  });

  it('should show error message on registration failure', () => {
    component.signUpForm.setValue({
      fullName: 'John Doe',
      email: 'test@example.com',
      password: 'password',
      role: UserRole.USER,
    });
    authService.register.and.returnValue(
      throwError(() => new Error('Registration failed')),
    );

    component.signUp();

    expect(component.pending()).toBeFalse();
    expect(snackBar.error).toHaveBeenCalled();
  });

  it('should not call signUp if form is invalid', () => {
    component.signUpForm.setValue({
      fullName: '',
      email: '',
      password: '',
      role: UserRole.USER,
    });

    component.signUp();

    expect(authService.register).not.toHaveBeenCalled();
  });
});
