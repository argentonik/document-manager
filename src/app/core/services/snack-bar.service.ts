import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  private snackBar = inject(MatSnackBar);

  public success(message: string): void {
    this.snackBar.open(message, 'Close');
  }

  public error(message: string): void {
    this.snackBar.open(message, 'Close', {
      panelClass: ['snackbar-error'],
    });
  }
}
