import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsListComponent } from './documents-list.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('DocumentsListComponent', () => {
  let component: DocumentsListComponent;
  let fixture: ComponentFixture<DocumentsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [DocumentsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsListComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('columns', ['name', 'status']);
    fixture.componentRef.setInput('documents', [
      {
        id: '1',
        name: 'Document 1',
        status: 'approved',
        createdAt: new Date(),
      },
      {
        id: '2',
        name: 'Document 2',
        status: 'pending',
        createdAt: new Date(),
      },
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
