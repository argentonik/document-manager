import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../../../core/auth/auth.service';
import { SnackBarService } from '../../../core/services/snack-bar.service';

@Component({
  template: '',
})
class DummyComponent {}

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let snackBar: jasmine.SpyObj<SnackBarService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn']);
    const snackBarServiceSpy = jasmine.createSpyObj('SnackBarService', [
      'openSnackBar',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([
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
