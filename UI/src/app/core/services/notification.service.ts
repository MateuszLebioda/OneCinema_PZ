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
    this._zone.run(() => {
      this._snackBar.open(message, 'X', {
        panelClass: ['succesMessage']
      });
    });
  }

  public showError(message: string): void {
    this._zone.run(() => {
      this._snackBar.open(message, 'X', {
        panelClass: ['error'],
      });
    });
  }
}
