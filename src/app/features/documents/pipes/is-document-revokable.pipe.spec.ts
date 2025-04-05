import { IsDocumentRevokablePipe } from './is-document-revokable.pipe';
import { TestBed } from '@angular/core/testing';
import { DOCUMENTS_CAN_BE_REVOKED_STATUSES } from '../views/documents/documents.providers';
import {
  provideExperimentalZonelessChangeDetection,
  runInInjectionContext,
} from '@angular/core';

describe('IsDocumentRevokablePipe', () => {
  let pipe: IsDocumentRevokablePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DOCUMENTS_CAN_BE_REVOKED_STATUSES,
          useValue: ['status1', 'status2'],
        },
      ],
    });
    pipe = runInInjectionContext(TestBed, () => new IsDocumentRevokablePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
