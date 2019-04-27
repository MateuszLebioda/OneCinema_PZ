import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MovieApiService} from './services/movie-api.service';
import {Movie} from './models/movie.model';
import {ActivatedRoute} from '@angular/router';

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {
  public movie: Movie;
  public movieId: string;

  constructor(
    private _movieService: MovieApiService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.movie = this._movieService.getMovie();
    console.log(this.movie);

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
