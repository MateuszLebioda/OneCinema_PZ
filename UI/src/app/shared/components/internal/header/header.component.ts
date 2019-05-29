import {Component, OnInit} from '@angular/core';
import {CinemaApiService} from '../../../../modules/cinema/services/cinema-api.service';
import {AuthenticationService} from '../../../../core/services/authentication/authentication.service';
import {LocalStorageKey} from '../../../../core/enums/local-storage-key';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public get isAdmin(): boolean {
    return !!localStorage.getItem(LocalStorageKey.AuthToken);
  }

  public get cinemPhoneNumber(): string {
    return this._cinemPhoneNumber;
  }

  private _cinemPhoneNumber: string;

  constructor(
    private _cinemaService: CinemaApiService,
    private _authService: AuthenticationService) {
    localStorage.setItem(LocalStorageKey.AuthToken, 'ssqs');
  }

  public ngOnInit(): void {
    this._cinemaService.getCinemaInfo().subscribe(cinema => {
      this._cinemPhoneNumber = cinema.phoneNumber;
    });
  }

  public logout(): void {
    this._authService.logout();
  }
}
