import {AfterViewChecked, Component, OnInit} from '@angular/core';
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
export class SlideBannerComponent implements OnInit, AfterViewChecked {
  public movies: MovieShortInfoApiModel[] = [];

  constructor(
    private _slideBannerService: SlideBannerApiService,
    private _router: Router) {
  }

  ngOnInit() {
    this._slideBannerService.getMovies().subscribe(m => {
      this.movies = m;
      this.movies.forEach(q => q.rating = 3);
    });
  }

  public ngAfterViewChecked(): void {
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

