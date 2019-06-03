import {Component, OnInit} from '@angular/core';
import {CinemaApiService} from './services/cinema-api.service';
import {CinemaApiModel} from './models/api/cinema-api.model';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public isMobile: boolean;

  private cinema: CinemaApiModel = new CinemaApiModel();

  constructor(
    private _cinemaService: CinemaApiService,
    private _deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.isMobile = this._deviceService.isMobile();

    this._cinemaService.getCinemaInfo().subscribe(cinema => {
      this.cinema = cinema;
    });
  }

}
