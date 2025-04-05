import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutComponent } from './main-layout.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { provideRouter } from '@angular/router';

describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'user',
      'logout',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        provideRouter([]),
        { provide: AuthService, useValue: authServiceSpy },
      ],
      imports: [MainLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
