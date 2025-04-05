import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsRootComponent } from './documents-root.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('DocumentsRootComponent', () => {
  let component: DocumentsRootComponent;
  let fixture: ComponentFixture<DocumentsRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [DocumentsRootComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
