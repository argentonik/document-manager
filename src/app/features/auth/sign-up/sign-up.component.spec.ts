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
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signUp']);
    const snackBarSpy = jasmine.createSpyObj('SnackBarService', ['open']);

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
});
