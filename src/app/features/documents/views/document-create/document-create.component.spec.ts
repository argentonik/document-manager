import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCreateComponent } from './document-create.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentsStore } from '../../store/documents.state';

describe('DocumentCreateComponent', () => {
  let component: DocumentCreateComponent;
  let fixture: ComponentFixture<DocumentCreateComponent>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const documentsStoreSpy = jasmine.createSpyObj('DocumentsStore', [
      'getDocuments',
      'updating',
    ]);

    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: DocumentsStore, useValue: documentsStoreSpy },
      ],
      imports: [DocumentCreateComponent],
    }).compileComponents();

    const store = TestBed.inject(DocumentsStore);
    fixture = TestBed.createComponent(DocumentCreateComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
