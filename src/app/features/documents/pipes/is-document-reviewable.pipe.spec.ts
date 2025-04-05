import { IsDocumentReviewablePipe } from './is-document-reviewable.pipe';
import { TestBed } from '@angular/core/testing';
import {
  provideExperimentalZonelessChangeDetection,
  runInInjectionContext,
} from '@angular/core';
import { DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES } from '../views/documents/documents.providers';

describe('IsDocumentReviewablePipe', () => {
  let pipe: IsDocumentReviewablePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DOCUMENTS_CAN_BE_SENT_FOR_REVIEW_STATUSES,
          useValue: ['status1', 'status2'],
        },
      ],
    });
    pipe = runInInjectionContext(TestBed, () => new IsDocumentReviewablePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
