import {Component, OnInit} from '@angular/core';
import {CinemaApiService} from './services/cinema-api.service';
import {CinemaApiModel} from './models/api-models/cinema-api.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public cinema: CinemaApiModel;

  constructor(private _cinemaService: CinemaApiService) {
  }

  public ngOnInit(): void {
    this.cinema = this._cinemaService.getCinemaInfo();
  }

}
