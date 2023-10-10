
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  openCustomSnackBar(
    message: string,
    type: 'error' | 'success' = 'success',
    color: string = 'default',
    duration: number = 2000
  ) {
    const panelClass = `custom-${type}`;
    const snackBarRef = this.snackBar.open(message, 'Close', {
      duration: duration,
      panelClass: [panelClass, `mat-${color}`],
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
