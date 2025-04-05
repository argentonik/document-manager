import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsListComponent } from './documents-list.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

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

  it('should update filters on sort change', () => {
    component.ngAfterViewInit();
    component.filters.set({ page: 1 });
    component.sort()?.sortChange.emit({ active: 'name', direction: 'asc' });
    fixture.detectChanges();

    expect(component.filters()).toEqual(
      jasmine.objectContaining({ sort: 'name,asc', page: 1 }),
    );
  });

  it('should update filters and set page and size on pagination', () => {
    component.onPaginate({ pageIndex: 2, pageSize: 10 } as PageEvent);
    fixture.detectChanges();

    expect(component.filters()).toEqual(
      jasmine.objectContaining({ page: 3, size: 10 }),
    );
  });

  it('should return true for showCreatorColumn if columns include creator', () => {
    fixture.componentRef.setInput('columns', ['name', 'creator']);
    fixture.detectChanges();

    expect(component.showCreatorColumn()).toBeTrue();
  });

  it('should return false for showCreatorColumn if columns do not include creator', () => {
    fixture.componentRef.setInput('columns', ['name', 'status']);
    fixture.detectChanges();

    expect(component.showCreatorColumn()).toBeFalse();
  });

  it('should return true for showReviewColumn if columns include review', () => {
    fixture.componentRef.setInput('columns', ['name', 'review']);
    fixture.detectChanges();

    expect(component.showReviewColumn()).toBeTrue();
  });

  it('should return false for showReviewColumn if columns do not include review', () => {
    fixture.componentRef.setInput('columns', ['name', 'status']);
    fixture.detectChanges();

    expect(component.showReviewColumn()).toBeFalse();
  });
});
