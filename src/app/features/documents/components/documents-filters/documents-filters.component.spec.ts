import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFiltersComponent } from './documents-filters.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';

describe('DocumentsFiltersComponent', () => {
  let component: DocumentsFiltersComponent;
  let fixture: ComponentFixture<DocumentsFiltersComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['user']);

    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: AuthService,
          useValue: authServiceSpy,
        },
      ],
      imports: [DocumentsFiltersComponent, ReactiveFormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsFiltersComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
