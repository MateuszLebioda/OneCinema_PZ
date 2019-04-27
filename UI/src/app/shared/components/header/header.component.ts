import {Component, OnInit} from '@angular/core';
import {CinemaApiService} from '../../../modules/cinema/services/cinema-api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cinemPhoneNumber: string;

  constructor(private _cinemaService: CinemaApiService) {
  }

  public ngOnInit(): void {
    const cinema = this._cinemaService.getCinemaInfo();
    this.cinemPhoneNumber = cinema.phoneNumber;
  }
}
