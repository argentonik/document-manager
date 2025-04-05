import { TestBed } from '@angular/core/testing';

import { DocumentDetailService } from './document-detail.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CONFIG } from '../../../../core/config/config.provider';

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
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
