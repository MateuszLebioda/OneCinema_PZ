import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {AuthenticationService} from './authentication.service';
import {LocalStorageKey} from '../../enums/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(private autoService: AuthenticationService) {
  }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({
      setHeaders: {
        // Authorization: `Bearer ${localStorage.get('token')}`
        Authorization: localStorage.getItem(LocalStorageKey.AuthToken)
      }
    });

    return next.handle(req);
  }
}
