import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsFiltersComponent } from './documents-filters.component';

describe('DocumentsFiltersComponent', () => {
  let component: DocumentsFiltersComponent;
  let fixture: ComponentFixture<DocumentsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentsFiltersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
