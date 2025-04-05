import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationModalComponent } from './confirmation-modal.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('ConfirmationModalComponent', () => {
  let component: ConfirmationModalComponent;
  let fixture: ComponentFixture<ConfirmationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideExperimentalZonelessChangeDetection(),
        {
          provide: MAT_DIALOG_DATA,
          useValue: 'test.txt',
        },
      ],
      imports: [ConfirmationModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
