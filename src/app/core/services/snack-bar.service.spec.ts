import { TestBed } from '@angular/core/testing';

import { SnackBarService } from './snack-bar.service';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

describe('SnackBarService', () => {
  let service: SnackBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideExperimentalZonelessChangeDetection()],
    });
    service = TestBed.inject(SnackBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
