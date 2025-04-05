import { IsDocumentReviewablePipe } from './is-document-reviewable.pipe';
import { TestBed } from '@angular/core/testing';
import {
  provideExperimentalZonelessChangeDetection,
  runInInjectionContext,
} from '@angular/core';
import { DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES } from '../views/documents/documents.providers';
import { Document, DocumentStatus } from '../store/document';

describe('IsDocumentReviewablePipe', () => {
  let pipe: IsDocumentReviewablePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES,
          useValue: [DocumentStatus.DRAFT],
        },
      ],
    });
    pipe = runInInjectionContext(TestBed, () => new IsDocumentReviewablePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if document status is in DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES', () => {
    const document = { status: DocumentStatus.DRAFT } as Document;
    expect(pipe.transform(document)).toBeTrue();
  });

  it('should return false if document status is not in DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES', () => {
    const document = { status: DocumentStatus.APPROVED } as Document;
    expect(pipe.transform(document)).toBeFalse();
  });
});
