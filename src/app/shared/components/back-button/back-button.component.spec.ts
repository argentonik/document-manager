import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonComponent } from './back-button.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
      imports: [BackButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
