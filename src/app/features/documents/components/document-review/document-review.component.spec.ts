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
          useValue: ['status1', 'status2'],
        },
        {
          provide: 'DOCUMENTS_REVIEWER_STATUSES',
          useValue: ['status3', 'status4'],
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
});
