import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentReviewComponent } from './document-review.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { DocumentStatus } from '../../store/document';

describe('DocumentReviewComponent', () => {
  let component: DocumentReviewComponent;
  let fixture: ComponentFixture<DocumentReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: 'DOCUMENTS_CAN_BE_REVIEWED_STATUSES',
          useValue: [DocumentStatus.READY_FOR_REVIEW],
        },
        {
          provide: 'DOCUMENTS_REVIEWER_STATUSES',
          useValue: [
            DocumentStatus.UNDER_REVIEW,
            DocumentStatus.APPROVED,
            DocumentStatus.DECLINED,
          ],
        },
      ],
      imports: [DocumentReviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentReviewComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('document', {
      id: '1',
      name: 'Doc',
      status: DocumentStatus.READY_FOR_REVIEW,
      fileUrl: 'url',
      updatedAt: '2024-10-01T00:00:00Z',
      createdAt: '2024-10-01T00:00:00Z',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should include current document status if not in reviewer statuses', () => {
    fixture.componentRef.setInput('document', {
      id: '1',
      name: 'Doc',
      status: DocumentStatus.READY_FOR_REVIEW,
      fileUrl: 'url',
      updatedAt: '2024-10-01T00:00:00Z',
      createdAt: '2024-10-01T00:00:00Z',
    });
    fixture.detectChanges();

    expect(component.statuses()).toEqual([
      DocumentStatus.READY_FOR_REVIEW,
      DocumentStatus.UNDER_REVIEW,
      DocumentStatus.APPROVED,
      DocumentStatus.DECLINED,
    ]);
  });

  it('should only include reviewer statuses if current status is in reviewer statuses', () => {
    fixture.componentRef.setInput('document', {
      id: '1',
      name: 'Doc',
      status: DocumentStatus.UNDER_REVIEW,
      fileUrl: 'url',
      updatedAt: '2024-10-01T00:00:00Z',
      createdAt: '2024-10-01T00:00:00Z',
    });
    fixture.detectChanges();

    expect(component.statuses()).toEqual([
      DocumentStatus.UNDER_REVIEW,
      DocumentStatus.APPROVED,
      DocumentStatus.DECLINED,
    ]);
  });

  it('should return true for canBeReviewed if document status is in canBeReviewedStatuses', () => {
    fixture.componentRef.setInput('document', {
      id: '1',
      name: 'Doc',
      status: DocumentStatus.READY_FOR_REVIEW,
      fileUrl: 'url',
      updatedAt: '2024-10-01T00:00:00Z',
      createdAt: '2024-10-01T00:00:00Z',
    });
    fixture.detectChanges();

    expect(component.canBeReviewed()).toBeTrue();
  });

  it('should return false for canBeReviewed if document status is not in canBeReviewedStatuses', () => {
    fixture.componentRef.setInput('document', {
      id: '1',
      name: 'Doc',
      status: DocumentStatus.DRAFT,
      fileUrl: 'url',
      updatedAt: '2024-10-01T00:00:00Z',
      createdAt: '2024-10-01T00:00:00Z',
    });
    fixture.detectChanges();

    expect(component.canBeReviewed()).toBeFalse();
  });
});
