import {Component, OnInit} from '@angular/core';
import {CinemaService} from './services/cinema.service';
import {CinemaApiModel} from './api-models/cinema-api.model';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent implements OnInit {
  public cinema: CinemaApiModel;

  constructor(private _cinemaService: CinemaService) {
  }

  public ngOnInit(): void {
    this.cinema = this._cinemaService.getCinemaInfo();
  }

}
