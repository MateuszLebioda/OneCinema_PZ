import {Component, OnInit} from '@angular/core';
import {CinemaApiService} from '../../../../modules/cinema/services/cinema-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public get cinemPhoneNumber(): string {
    return this._cinemPhoneNumber;
  }

  private _cinemPhoneNumber: string;

  constructor(private _cinemaService: CinemaApiService) {
  }

  public ngOnInit(): void {
    this._cinemaService.getCinemaInfo().subscribe(cinema => {
      this._cinemPhoneNumber = cinema.phoneNumber;
    });
  }
}
