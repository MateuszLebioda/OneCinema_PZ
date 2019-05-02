import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Movie} from '../../../movie/models/movie.model';
import {MovieApiService} from '../../../movie/services/movie-api.service';
import {ActivatedRoute} from '@angular/router';

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-preview-movie',
  templateUrl: './preview-movie.component.html',
  styleUrls: ['./preview-movie.component.css']
})
export class PreviewMovieComponent implements OnInit, AfterViewInit {
  public movie: Movie;
  public movieId: string;

  constructor(
    private _movieService: MovieApiService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.movie = this._movieService.getMovie();

    this.movieId = this.route.snapshot.params.movieId;
  }

  public ngAfterViewInit(): void {
    showVideoPlayer();
  }

  public getFakeTableForShowingStars(rating: number): number[] {
    return new Array<number>(parseInt(rating.toString(), 10));
  }

  public ratingHasHalfPoint(rating: number): boolean {
    return !Number.isInteger(rating);
  }

  public getFakeTableForShowingEmptyStars(rating: number): number[] {
    return new Array<number>(parseInt((5 - rating).toString(), 10));
  }
}
