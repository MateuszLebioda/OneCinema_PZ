import {Component, OnInit} from '@angular/core';
import {AdminPanelApiService} from './services/admin-panel-api.service';
import {MovieApiModel} from './models/api/movie-api.model';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
  public get movies(): MovieApiModel[] {
    return this._movies;
  }

  private _movies: MovieApiModel[] = [];

  constructor(private _apiService: AdminPanelApiService, private http: HttpClient) {
  }

  public ngOnInit(): void {
    this._apiService.getMovies().subscribe(movies => {
      this._movies = movies;
    });
  }

  public deleteMovie(movieId: string): void {
    // this.http.get('urlhere').subscribe();
    // this._apiService.deleteMovie(movieId);
  }
}
