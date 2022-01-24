import {MatDialog} from '@angular/material/dialog';
import {WarningDialogComponent} from '../../shared/dialogs/warning-dialog.component';

export function handleHttpErrors(err: any): string {
  let errorMessage = 'Error';

  if (!err.status) {
    console.error(err);
    return errorMessage;
  }

  switch (err.status){
    case 400:
      console.debug(err);
      errorMessage = returnMessageIfNotEmpty(err.error.message, true);
      break;
    case 401:
      console.debug(err);
      errorMessage = returnMessageIfNotEmpty(err.error.message, true)
      break;
    case 404:
      console.debug(err);
      errorMessage = returnMessageIfNotEmpty(err.error.message, false);
      break;
    case 409:
      console.debug(err);
      errorMessage = 'Duplicate Error';
      break;
    case 500:
      console.error(err);
      errorMessage = 'Server Error';
      break;
  }

  return errorMessage;
}

function returnMessageIfNotEmpty(message: string, fourOO: boolean): string {
  if (message){
    return message;
  }

  if (fourOO) {
    return 'Invalid Data!';
  } else {
    return 'Not Found';
  }
}

export function handleHttpAuthErrors(err: any): string {
  console.error(err);

  let errorMessage = 'Error';

  if (!err.status) {
    return errorMessage;
  }

  switch (err.status){
    case 400:
      errorMessage = err.error.message;
      break;
    case 401:
      errorMessage = 'Invalid Credentials. Please, try again.';
      break;
    case 404:
      errorMessage = err.error.message;
      break;
    case 409:
      errorMessage = 'Email already registered';
      break;
    case 500:
      errorMessage = 'Server Error';
      break;
  }

  return errorMessage;
}

export function displayHttpError(message: string, dialog: MatDialog): void {
  dialog.open(WarningDialogComponent, {data: {warningMessage: message}});
}

/*
* Used for requests without result, mainly put and delete
*/
export function emptyFunction(): void {}
