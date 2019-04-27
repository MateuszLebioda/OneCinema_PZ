import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SlideBannerApiService} from './services/slide-banner-api.service';
import {SlideBannerMovie} from './models/banner-movie';
import {Router} from '@angular/router';

declare function showSlideBanner(): void;

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-slide-banner',
  templateUrl: './slide-banner.component.html',
  styleUrls: ['./slide-banner.component.css']
})
export class SlideBannerComponent implements OnInit, AfterViewInit {
  public movies: SlideBannerMovie[];

  constructor(
    private _slideBannerService: SlideBannerApiService,
    private _router: Router) {
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

  public navigateToMovie(movieId: string): void {
    this._router.navigate(['/film', movieId]);
  }
}

