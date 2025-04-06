import { TestBed } from '@angular/core/testing';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { DocumentsService } from '../views/documents/documents.service';
import { DocumentsStore } from './documents.state';
import { Document, DocumentStatus } from './document';
import { of } from 'rxjs';
import { List } from '../models/list.interface';
import { CreateDocumentReq } from '../models/create-document-req.interface';
import { SnackBarService } from '../../../core/services/snack-bar.service';

describe('DocumentStore', () => {
  let service: jasmine.SpyObj<DocumentsService>;
  let snackBar: jasmine.SpyObj<SnackBarService>;

  const document = {
    id: '1',
    name: 'Doc',
    fileUrl: 'url',
    status: DocumentStatus.DRAFT,
    createdAt: '02.02.2025',
    updatedAt: '02.02.2025',
  };

  beforeEach(() => {
    const serviceSpy = jasmine.createSpyObj('DocumentsService>', [
      'getDocuments',
      'createDocument',
      'updateDocument',
      'removeDocument',
      'sendToReview',
      'rewokeReview',
      'changeStatus',
    ]);
    const snackBarSpy = jasmine.createSpyObj('SnackBarService', [
      'error',
      'success',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        DocumentsStore,
        {
          provide: DocumentsService,
          useValue: serviceSpy,
        },
        {
          provide: SnackBarService,
          useValue: snackBarSpy,
        },
      ],
    });

    service = TestBed.inject(
      DocumentsService,
    ) as jasmine.SpyObj<DocumentsService>;
    snackBar = TestBed.inject(
      SnackBarService,
    ) as jasmine.SpyObj<SnackBarService>;
  });

  it('should get documents', () => {
    const items: List<Document> = {
      count: 1,
      results: [document],
    };
    service.getDocuments.and.returnValue(of(items));

    const store = TestBed.inject(DocumentsStore);
    store.getDocuments();

    expect(store.items()).toEqual(items.results);
    expect(store.count()).toEqual(1);
    expect(store.loading()).toEqual(false);
  });

  it('should filter documents', () => {
    const items: List<Document> = {
      count: 1,
      results: [document],
    };
    service.getDocuments.and.returnValue(of(items));

    const filters = {
      page: 1,
      size: 5,
      sort: 'updatedAt,desc',
      status: DocumentStatus.DRAFT,
      creatorId: 'creatorId',
      creatorEmail: 'creatorEmail',
    };

    const store = TestBed.inject(DocumentsStore);
    store.filterDocuments(filters);

    expect(store.filters()).toEqual(filters);
    expect(store.items()).toEqual(items.results);
    expect(store.count()).toEqual(1);
    expect(store.loading()).toEqual(false);
  });

  it('should create document', () => {
    const docCreate: CreateDocumentReq = {
      name: 'Doc',
      file: new File([], 'file'),
      status: DocumentStatus.DRAFT,
    };
    const items: List<Document> = {
      count: 1,
      results: [document],
    };

    service.createDocument.and.returnValue(of(document));
    service.getDocuments.and.returnValue(of(items));

    const store = TestBed.inject(DocumentsStore);
    store.createDocument(docCreate);

    expect(store.items()).toContain(document);
    expect(store.loading()).toEqual(false);
    expect(snackBar.success).toHaveBeenCalled();
  });

  it('should update document', () => {
    const items: List<Document> = {
      count: 1,
      results: [document],
    };

    service.createDocument.and.returnValue(of(document));
    service.getDocuments.and.returnValue(of(items));

    const store = TestBed.inject(DocumentsStore);
    store.updateDocument({ id: '1', data: document });

    expect(store.items()).toContain(document);
    expect(store.loading()).toEqual(false);
    expect(store.count()).toEqual(1);
  });
});
