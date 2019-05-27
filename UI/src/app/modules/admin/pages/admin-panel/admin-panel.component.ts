import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AdminPanelApiService} from './services/admin-panel-api.service';
import {MovieApiModel} from './models/api/movie-api.model';
import {LocalStorageKey} from '../../../../core/enums/local-storage-key';
import {NotificationService} from '../../../../core/services/notification.service';

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

  constructor(
    private _cd: ChangeDetectorRef,
    private _notificationService: NotificationService,
    private _apiService: AdminPanelApiService) {
  }

  ngOnInit() {
    this._apiService.getMovies().subscribe(movies => {
      this._movies = movies;
    });

    const successMessage = localStorage.getItem(LocalStorageKey.SuccessMessage);

    if (successMessage && successMessage.length > 0 && successMessage !== 'null' && successMessage !== 'undefined') {
      this._notificationService.showSuccess(successMessage);
      localStorage.setItem(LocalStorageKey.SuccessMessage, null);
    }
  }

  public deleteMovie(movieId: string): void {
    this._apiService.deleteMovie(movieId).subscribe(() => {
      this._apiService.getMovies().subscribe(movies => {
        this._movies = movies;
        this._notificationService.showSuccess('Pomyślnie usunięto film');
      });
    });
  }
}
