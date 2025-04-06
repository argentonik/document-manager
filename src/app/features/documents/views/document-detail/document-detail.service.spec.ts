import { TestBed } from '@angular/core/testing';

import { DocumentDetailService } from './document-detail.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../core/config/config.provider';
import { Document, DocumentStatus } from '../../store/document';
import { of, throwError } from 'rxjs';

describe('DocumentDetailService', () => {
  let service: DocumentDetailService;
  let httpClient: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);

    TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: CONFIG,
          useValue: {
            apiUrl: 'http://localhost:3000',
          },
        },
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(DocumentDetailService);
    httpClient = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call HttpClient.get with the correct URL', () => {
    const id = '123';
    service.getDocument(id);
    expect(httpClient.get).toHaveBeenCalledWith(
      'http://localhost:3000/document/123',
    );
  });

  it('should return document when getDocument is called', () => {
    const id = '123';
    const document: Document = {
      id: '123',
      name: 'Test Document',
      status: DocumentStatus.DRAFT,
      createdAt: '02.05.2025',
      updatedAt: '02.05.2025',
      fileUrl: 'url',
    };
    httpClient.get.and.returnValue(of(document));

    service.getDocument(id).subscribe((result) => {
      expect(result).toEqual(document);
    });
  });

  it('should throw an error when HttpClient.get fails', () => {
    const id = '123';
    const errorResponse = new ErrorEvent('Network error');
    httpClient.get.and.returnValue(throwError(errorResponse));

    service.getDocument(id).subscribe({
      error: (error) => {
        expect(error).toBe(errorResponse);
      },
    });
  });
});
