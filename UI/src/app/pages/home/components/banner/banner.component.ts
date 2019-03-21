import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BannerService} from './services/banner.service';
import {BannerMovie} from './models/banner-movie';
import jquerySlidey from '../../../../../assets/js/jquery.slidey.js';
import jqueryDotdotdot from '../../../../../assets/js/jquery.dotdotdot.min.js';

declare function showBanner(): void;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit, AfterViewInit {
  public movies: BannerMovie[];

  constructor(private _bannerService: BannerService) {
  }

  public ngOnInit(): void {
    this.movies = this._bannerService.getMovies();
    const importJquerySlidey = jquerySlidey;
    const importDotdotdot = jqueryDotdotdot;
  }

  public ngAfterViewInit(): void {
    showBanner();
  }
}
