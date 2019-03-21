import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MovieService} from './services/movie.service';
import {Movie} from './models/movie.model';

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {
  public movie: Movie;

  constructor(private _movieService: MovieService) {
  }

  public ngOnInit(): void {
    this.movie = this._movieService.getMovie();
    console.log(this.movie);
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
