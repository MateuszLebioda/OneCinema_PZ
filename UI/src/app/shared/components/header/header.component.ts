import {Component, OnInit} from '@angular/core';
import {CinemaService} from '../../../modules/cinema/services/cinema.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cinemPhoneNumber: string;

  constructor(private _cinemaService: CinemaService) {
  }

  public ngOnInit(): void {
    const cinema = this._cinemaService.getCinemaInfo();
    this.cinemPhoneNumber = cinema.phoneNumber;
  }
}
