import {Component, OnInit} from '@angular/core';
import {AdminPanelApiService} from './services/admin-panel-api.service';
import {MovieApiModel} from './api-models/movie-api.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public movies: MovieApiModel[] = [];

  constructor(private _adminPanelService: AdminPanelApiService) {
  }

  public ngOnInit(): void {
    this.movies = this._adminPanelService.getMovies();
  }

}
