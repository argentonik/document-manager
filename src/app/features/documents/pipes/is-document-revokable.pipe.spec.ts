import { IsDocumentRevokablePipe } from './is-document-revokable.pipe';
import { TestBed } from '@angular/core/testing';
import { DOCUMENTS_CAN_BE_REVOKED_STATUSES } from '../views/documents/documents.providers';
import {
  provideExperimentalZonelessChangeDetection,
  runInInjectionContext,
} from '@angular/core';
import { Document, DocumentStatus } from '../store/document';

describe('IsDocumentRevokablePipe', () => {
  let pipe: IsDocumentRevokablePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DOCUMENTS_CAN_BE_REVOKED_STATUSES,
          useValue: [DocumentStatus.DRAFT, DocumentStatus.UNDER_REVIEW],
        },
      ],
    });
    pipe = runInInjectionContext(TestBed, () => new IsDocumentRevokablePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if document status is in DOCUMENTS_CAN_BE_REVOKED_STATUSES', () => {
    const document = { status: DocumentStatus.DRAFT } as Document;
    expect(pipe.transform(document)).toBeTrue();
  });

  it('should return false if document status is not in DOCUMENTS_CAN_BE_REVOKED_STATUSES', () => {
    const document = { status: DocumentStatus.APPROVED } as Document;
    expect(pipe.transform(document)).toBeFalse();
  });
});
