import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BannerService} from './services/banner.service';
import {BannerMovie} from './models/banner-movie';

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
    console.log(this.movies);
  }

  public ngAfterViewInit(): void {
    showBanner();
  }
}
