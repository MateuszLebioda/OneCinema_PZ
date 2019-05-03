import {Component, OnInit} from '@angular/core';
import {BannerApiService} from './services/banner-api.service';
import {MovieShortInfoApiModel} from '../../models/api/movie-short-info-api.model';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  public movies: MovieShortInfoApiModel[] = [];
  public isMobile: boolean;
  public table: number[] = [1, 2, 3];

  constructor(
    private _bannerService: BannerApiService,
    private _deviceService: DeviceDetectorService) {
  }

  ngOnInit() {
    this.movies = this._bannerService.getMovies();
    this.isMobile = this._deviceService.isMobile();
  }

  public changeDisplayedMovies(): void {
    const movie = this.movies.shift();
    this.movies.push(movie);
  }

  public clickedNextMovie(movieIndex: number): void {
    for (let i = 0; i < movieIndex; i++) {
      this.changeDisplayedMovies();
    }
  }
}
