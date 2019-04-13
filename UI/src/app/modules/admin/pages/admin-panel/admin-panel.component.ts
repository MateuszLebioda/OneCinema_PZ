import {Component, OnInit} from '@angular/core';
import {AdminPanelService} from './services/admin-panel.service';
import {MovieApiModel} from './api-models/movie-api.model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public movies: MovieApiModel[] = [];

  constructor(private _adminPanelService: AdminPanelService) {
  }

  public ngOnInit(): void {
    this.movies = this._adminPanelService.getMovies();
  }

}
