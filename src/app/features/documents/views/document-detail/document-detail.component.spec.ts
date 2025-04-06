import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDetailComponent } from './document-detail.component';
import {
  Component,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { Router } from '@angular/router';
import { DocumentStore } from '../../store/document-detail.state';
import { DocumentsStore } from '../../store/documents.state';
import { CONFIG } from '../../../../core/config/config.provider';
import { PdfViewerComponent } from '../../components/pdf-viewer/pdf-viewer.component';

@Component({
  selector: 'app-pdf-viewer',
  template: '',
})
export class MockPdfViewer {}

describe('DocumentDetailComponent', () => {
  let component: DocumentDetailComponent;
  let fixture: ComponentFixture<DocumentDetailComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const documentStoreSpy = jasmine.createSpyObj('DocumentStore', [
      'document',
      'loading',
      'getDocument',
    ]);
    const documentsStoreSpy = jasmine.createSpyObj('DocumentsStore', [
      'sendDocumentOnReview',
      'revokeDocument',
      'deleteDocument',
      'updating',
    ]);

    await TestBed.configureTestingModule({
      imports: [DocumentDetailComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: CONFIG,
          useValue: {
            apiUrl: 'http://localhost:3000',
          },
        },
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    })
      .overrideComponent(DocumentDetailComponent, {
        remove: {
          imports: [PdfViewerComponent],
        },
        add: {
          imports: [MockPdfViewer],
        },
      })
      .overrideProvider(DocumentsStore, { useValue: documentsStoreSpy })
      .overrideProvider(DocumentStore, { useValue: documentStoreSpy })
      .compileComponents();

    fixture = TestBed.createComponent(DocumentDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    const documentStore = TestBed.inject(DocumentStore);
    const documentsStore = TestBed.inject(DocumentsStore);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
