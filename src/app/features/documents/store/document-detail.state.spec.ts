import { DocumentDetailService } from '../views/document-detail/document-detail.service';
import { DocumentStore } from './document-detail.state';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Document, DocumentStatus } from './document';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('DocumentDetailStore', () => {
  let service: jasmine.SpyObj<DocumentDetailService>;

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('service', ['getDocument']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DocumentStore,
        {
          provide: DocumentDetailService,
          useValue: serviceSpy,
        },
      ],
    });

    service = TestBed.inject(
      DocumentDetailService,
    ) as jasmine.SpyObj<DocumentDetailService>;
  });

  it('should get an item from the store', () => {
    const item: Document = {
      id: '1',
      name: 'Doc',
      fileUrl: 'url',
      status: DocumentStatus.DRAFT,
      createdAt: '02.02.2025',
      updatedAt: '02.02.2025',
    };
    service.getDocument.and.returnValue(of(item));

    const store = TestBed.inject(DocumentStore);
    store.getDocument('1');

    expect(store.document()).toEqual(item);
    expect(store.loading()).toEqual(false);
  });
});
