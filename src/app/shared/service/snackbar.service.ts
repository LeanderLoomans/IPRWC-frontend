import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  standardDuration = 3000;
  standardHorizontalPosition: MatSnackBarHorizontalPosition = 'right';
  standardVerticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackbar: MatSnackBar) {  }

  showMessage(
    message: string,
    duration: number = this.standardDuration,
    horizontalPosition: MatSnackBarHorizontalPosition = this.standardHorizontalPosition,
    verticalPosition: MatSnackBarVerticalPosition = this.standardVerticalPosition
  ) {
    this.snackbar.open(
      message,
      '',
      {
        duration,
        verticalPosition,
        horizontalPosition
      }
    );
  }
}
