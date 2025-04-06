import { TestBed } from '@angular/core/testing';

import { DocumentsService } from './documents.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CONFIG } from '../../../../core/config/config.provider';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DocumentStatus } from '../../store/document';
import { CreateDocumentReq } from '../../models/create-document-req.interface';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientMock = jasmine.createSpyObj('HttpClient', [
      'post',
      'get',
      'patch',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: CONFIG,
          useValue: {
            apiUrl: 'http://localhost:3000',
          },
        },
        {
          provide: HttpClient,
          useValue: httpClientMock,
        },
      ],
    });
    service = TestBed.inject(DocumentsService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call .post with the correct data when createDocument is called', () => {
    const document: CreateDocumentReq = {
      name: 'Test Document',
      status: DocumentStatus.APPROVED,
      file: new File([''], 'test.pdf'),
    };
    service.createDocument(document);
    const formData = new FormData();
    formData.append('name', document.name);
    formData.append('status', document.status);
    formData.append('file', document.file);
    expect(httpClient.post).toHaveBeenCalledWith(
      'http://localhost:3000/document',
      formData,
    );
  });

  it('should call get with correct params when getDocuments is called', () => {
    const filters = {
      page: 1,
      size: 10,
      sort: 'name',
      status: DocumentStatus.DRAFT,
      creatorId: '123',
      creatorEmail: 'test@example.com',
    };
    service.getDocuments(filters);
    const params = new HttpParams()
      .append('page', '1')
      .append('size', '10')
      .append('sort', 'name')
      .append('status', 'DRAFT')
      .append('creatorId', '123')
      .append('creatorEmail', 'test@example.com');
    expect(httpClient.get).toHaveBeenCalledWith(
      'http://localhost:3000/document',
      { params },
    );
  });

  it('should call patch with the correct data when updateDocument is called', () => {
    const id = '123';
    const data = { name: 'Updated Document' };
    service.updateDocument(id, data);
    expect(httpClient.patch).toHaveBeenCalledWith(
      'http://localhost:3000/document/123',
      data,
    );
  });

  it('should call delete with the correct data when removeDocument is called', () => {
    const id = '123';
    service.removeDocument(id);
    expect(httpClient.delete).toHaveBeenCalledWith(
      'http://localhost:3000/document/123',
    );
  });

  it('should call post with the correct data when sendToReview is called', () => {
    const id = '123';
    service.sendToReview(id);
    expect(httpClient.post).toHaveBeenCalledWith(
      'http://localhost:3000/document/123/send-to-review',
      {},
    );
  });

  it('should call post with the correct data when revokeReview is called', () => {
    const id = '123';
    service.revokeReview(id);
    expect(httpClient.post).toHaveBeenCalledWith(
      'http://localhost:3000/document/123/revoke-review',
      {},
    );
  });

  it('should call post with the correct data when changeStatus is called', () => {
    const id = '123';
    const status = DocumentStatus.APPROVED;
    service.changeStatus(id, status);
    expect(httpClient.post).toHaveBeenCalledWith(
      'http://localhost:3000/document/123/change-status',
      { status },
    );
  });
});
