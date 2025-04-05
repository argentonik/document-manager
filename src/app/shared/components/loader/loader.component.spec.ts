import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [LoaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
