import { IsDocumentRemovablePipe } from './is-document-removable.pipe';
import { TestBed } from '@angular/core/testing';
import {
  provideExperimentalZonelessChangeDetection,
  runInInjectionContext,
} from '@angular/core';
import { DOCUMENTS_USER_STATUSES } from '../views/documents/documents.providers';

describe('IsDocumentRemovablePipe', () => {
  let pipe: IsDocumentRemovablePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: DOCUMENTS_USER_STATUSES,
          useValue: ['status1', 'status2'],
        },
      ],
    });
    pipe = runInInjectionContext(TestBed, () => new IsDocumentRemovablePipe());
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
