import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SlideBannerService} from './services/slide-banner.service';
import {SlideBannerMovie} from './models/banner-movie';

declare function showSlideBanner(): void;
declare function showVideoPlayer(): void;

@Component({
  selector: 'app-slide-banner',
  templateUrl: './slide-banner.component.html',
  styleUrls: ['./slide-banner.component.css']
})
export class SlideBannerComponent implements OnInit, AfterViewInit {
  public movies: SlideBannerMovie[];

  constructor(private _slideBannerService: SlideBannerService) {
  }

  public ngOnInit(): void {
    this.movies = this._slideBannerService.getMovies();
  }

  public ngAfterViewInit(): void {
    showSlideBanner();
    showVideoPlayer();
  }

  public getFakeTableForShowingStars(rating: number): number[] {
    return new Array<number>(parseInt(rating.toString(), 10));
  }

  public ratingHasHalfPoint(rating: number): boolean {
    return !Number.isInteger(rating);
  }

  public sss() {
    console.log('jeeee');
  }
}

