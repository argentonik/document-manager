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

  it('should open a success snackbar', () => {
    const message = 'Success';
    const snackBarSpy = spyOn(service['snackBar'], 'open');

    service.success(message);

    expect(snackBarSpy).toHaveBeenCalledWith(message, 'Close');
  });

  it('should open an error snackbar', () => {
    const message = 'Error';
    const snackBarSpy = spyOn(service['snackBar'], 'open');

    service.error(message);

    expect(snackBarSpy).toHaveBeenCalledWith(message, 'Close', {
      panelClass: ['snackbar-error'],
    });
  });
});
