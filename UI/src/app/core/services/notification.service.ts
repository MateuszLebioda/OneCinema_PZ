import {Injectable, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private _snackBar: MatSnackBar,
    private _zone: NgZone) {
  }

  public showSuccess(message: string): void {
    // Had an issue with the snackbar being ran outside of angular's zone.
    this._zone.run(() => {
      this._snackBar.open(message);
    });
  }

  public showError(message: string): void {
    this._zone.run(() => {
      // The second parameter is the text in the button.
      // In the third, we send in the css class for the snack bar.
      this._snackBar.open(message, 'X', {
        panelClass: ['error']
      });
    });
  }
}
