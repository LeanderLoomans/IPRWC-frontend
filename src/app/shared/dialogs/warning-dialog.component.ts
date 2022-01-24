import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-warning-dialog',
  template: `
    <h2 mat-dialog-title>An Error Occurred!</h2>
    <mat-dialog-content class="mat-typography">
      <p>{{data.warningMessage}}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-raised-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
  styles: [`

  `]
})
export class WarningDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {warningMessage: string}) {
  }
}
