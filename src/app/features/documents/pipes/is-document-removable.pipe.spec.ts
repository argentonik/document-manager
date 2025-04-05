import { IsDocumentRemovablePipe } from './is-document-removable.pipe';
import { TestBed } from '@angular/core/testing';
import {
  provideExperimentalZonelessChangeDetection,
  runInInjectionContext,
} from '@angular/core';
import { DOCUMENTS_USER_STATUSES } from '../views/documents/documents.providers';
import { Document, DocumentStatus } from '../store/document';

describe('IsDocumentRemovablePipe', () => {
  let pipe: IsDocumentRemovablePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DOCUMENTS_USER_STATUSES,
          useValue: [DocumentStatus.DRAFT, DocumentStatus.READY_FOR_REVIEW],
        },
      ],
    });
    pipe = runInInjectionContext(TestBed, () => new IsDocumentRemovablePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return true if document status is in DOCUMENT_USER_STATUSES', () => {
    const document = { status: DocumentStatus.DRAFT } as Document;
    expect(pipe.transform(document)).toBeTrue();
  });

  it('should return false if document status is not in DOCUMENT_USER_STATUSES', () => {
    const document = { status: DocumentStatus.APPROVED } as Document;
    expect(pipe.transform(document)).toBeFalse();
  });
});
