import {Component, OnInit} from '@angular/core';
import {AdminPanelApiService} from './services/admin-panel-api.service';
import {MovieApiModel} from './api-models/movie-api.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public movies: MovieApiModel[] = [];

  constructor(private _apiService: AdminPanelApiService, private http: HttpClient) {
  }

  public ngOnInit(): void {
    this.movies = this._apiService.getMovies();
  }

  public deleteMovie(movieId: string): void {
    this.http.get('urlhere').subscribe();
    // this._apiService.deleteMovie(movieId);
  }
}
