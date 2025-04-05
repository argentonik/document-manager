import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsComponent } from './documents.component';
import {
  Component,
  input,
  model,
  provideExperimentalZonelessChangeDetection,
} from '@angular/core';
import { Router } from '@angular/router';
import { DocumentsStore } from '../../store/documents.state';
import { DOCUMENTS_COLUMNS } from './documents.providers';
import { AuthService } from '../../../../core/auth/auth.service';
import { DocumentsListComponent } from '../../components/documents-list/documents-list.component';
import { DocumentsFiltersComponent } from '../../components/documents-filters/documents-filters.component';
import { DocumentFilters } from '../../models/document-filters.interface';
import { Document } from '../../store/document';

@Component({
  selector: 'app-documents-filters',
  template: '',
})
class FiltersMockComponent {
  public filters = model<Partial<DocumentFilters>>();
}

@Component({
  selector: 'app-documents-list',
  template: '',
})
class ListMockComponent {
  public columns = input.required<string[]>();
  public documents = input.required<Document[]>();
  public loading = input<boolean>(false);
  public count = input<number>(0);
  public filters = model<Partial<DocumentFilters>>();
}

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let router: jasmine.SpyObj<Router>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const documentsStoreSpy = jasmine.createSpyObj('DocumentsStore', [
      'items',
      'count',
      'filters',
      'loading',
      'filterDocuments',
      'sendDocumentOnReview',
      'revokeDocument',
      'changeDocumentStatus',
      'deleteDocument',
    ]);
    const authServiceSpy = jasmine.createSpyObj('AuthService', [
      'getUser',
      'user',
    ]);

    await TestBed.configureTestingModule({
      imports: [DocumentsComponent],
      providers: [
        provideExperimentalZonelessChangeDetection(),
        { provide: DOCUMENTS_COLUMNS, useValue: ['column1', 'column2'] },
        { provide: Router, useValue: routerSpy },
        { provide: AuthService, useValue: authServiceSpy },
      ],
    })
      .overrideComponent(DocumentsComponent, {
        remove: {
          imports: [DocumentsListComponent, DocumentsFiltersComponent],
        },
        add: { imports: [ListMockComponent, FiltersMockComponent] },
      })
      .overrideProvider(DocumentsStore, { useValue: documentsStoreSpy })
      .compileComponents();

    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    const documentsStore = TestBed.inject(DocumentsStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
