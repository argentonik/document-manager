import { TestBed } from '@angular/core/testing';

import { DocumentsService } from './documents.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CONFIG } from '../../../../core/config/config.provider';
import { HttpClient } from '@angular/common/http';

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
});
