import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MovieApiService} from './services/movie-api.service';
import {Movie} from './models/movie.model';
import {ActivatedRoute} from '@angular/router';
import {MapperService} from '../../shared/helpers/external/mapper/mapper.service';

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {
  public movie: Movie = new Movie();
  public movieId: string;

  constructor(
    private _movieService: MovieApiService,
    private _mapper: MapperService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.movieId = this.route.snapshot.params.movieId;

    this._movieService.getMovie(this.movieId).subscribe(movie => {
      this.movie = this._mapper.toMovie(movie);
    });
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
