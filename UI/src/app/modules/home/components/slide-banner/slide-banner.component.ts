import {AfterViewInit, Component, OnInit} from '@angular/core';
import {SlideBannerApiService} from './services/slide-banner-api.service';
import {MovieShortInfoApiModel} from '../../models/api/movie-short-info-api.model';
import {Router} from '@angular/router';

declare function showSlideBanner(): void;

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-slide-banner',
  templateUrl: './slide-banner.component.html',
  styleUrls: ['./slide-banner.component.css']
})
export class SlideBannerComponent implements OnInit, AfterViewInit {
  public movies: MovieShortInfoApiModel[];

  constructor(
    private _slideBannerService: SlideBannerApiService,
    private _router: Router) {
  }

  ngOnInit() {
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

