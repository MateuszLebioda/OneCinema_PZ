import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router) {
  }

  public canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // tslint:disable-next-line:no-shadowed-variable
    return this.authService.authState$.pipe(map(state => {
        if (state !== null) {
          return true;
        }

        this.router.navigate(['/blad']);
        return false;
      }
      )
    );
  }
}
