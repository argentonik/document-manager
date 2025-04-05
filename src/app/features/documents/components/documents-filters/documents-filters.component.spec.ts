import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFiltersComponent } from './documents-filters.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/auth/auth.service';
import { DocumentStatus } from '../../store/document';

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

  it('should set status to -1 if filters status is undefined', () => {
    component.filters.set({ status: undefined });
    fixture.detectChanges();

    expect(component.status()).toBe(-1);
  });

  it('should set status to filters status if defined', () => {
    component.filters.set({ status: DocumentStatus.APPROVED });
    fixture.detectChanges();

    component.ngOnChanges();

    expect(component.status()).toBe(DocumentStatus.APPROVED);
  });

  it('should update filters and set page to 1 on status change to a valid status', () => {
    component.onStatusChange(DocumentStatus.REVOKE);
    fixture.detectChanges();

    expect(component.filters()).toEqual(
      jasmine.objectContaining({ status: DocumentStatus.REVOKE, page: 1 }),
    );
  });

  it('should update filters and set page to 1 on status change to -1', () => {
    component.onStatusChange(-1);
    fixture.detectChanges();

    expect(component.filters()).toEqual(
      jasmine.objectContaining({ status: undefined, page: 1 }),
    );
  });
});
