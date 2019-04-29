import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BannerApiService} from './services/banner-api.service';
import jquerySlidey from '../../../../../assets/js/jquery.slidey.js';
import jqueryDotdotdot from '../../../../../assets/js/jquery.dotdotdot.min.js';
import {MovieShortInfoApiModel} from '../../models/api/movie-short-info-api.model';

declare function showBanner(): void;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, AfterViewInit {
  public movies: MovieShortInfoApiModel[] = [];

  constructor(private _bannerService: BannerApiService) {
  }

  ngOnInit() {
    this.movies = this._bannerService.getMovies();
    const importJquerySlidey = jquerySlidey;
    const importDotdotdot = jqueryDotdotdot;
  }

  public ngAfterViewInit(): void {
    showBanner();
  }
}
