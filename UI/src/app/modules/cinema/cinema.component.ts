import {Component, OnInit} from '@angular/core';
import {CinemaApiService} from './services/cinema-api.service';
import {CinemaApiModel} from './models/api/cinema-api.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  private cinema: CinemaApiModel = new CinemaApiModel();

  constructor(private _cinemaService: CinemaApiService) {
  }

  ngOnInit() {
    this._cinemaService.getCinemaInfo().subscribe(cinema => {
      this.cinema = cinema;
    });
  }

}
