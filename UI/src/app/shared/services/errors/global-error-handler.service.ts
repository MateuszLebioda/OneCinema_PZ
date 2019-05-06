import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../notification.service';
import {ErrorService} from './error.service';
import {Router} from '@angular/router';

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(
    private _zone: NgZone,
    private _injector: Injector) {
  }

  public handleError(error: Error | HttpErrorResponse): void {
    const errorService = this._injector.get(ErrorService);
    const notifier = this._injector.get(NotificationService);

    let message;
    if (error instanceof HttpErrorResponse) {

      switch (error.status) {
        case 404 :
        case 500 :
          this._zone.run(() => {
            const router = this._injector.get(Router);
            router.navigate(['/blad']);
          });
          break;
        default:
          message = errorService.getServerErrorMessage(error);
          notifier.showError(message);
      }
    } else {
      // Client Error
      message = errorService.getClientErrorMessage(error);
      notifier.showError(message);
    }
  }
}
