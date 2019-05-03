import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PreviewMovieApiModel} from './models/api/preview-movie-api.model';
import {PreviewMovieApiService} from './services/preview-movie-api.service';

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-preview-movie',
  templateUrl: './preview-movie.component.html',
  styleUrls: ['./preview-movie.component.css']
})
export class PreviewMovieComponent implements OnInit, AfterViewInit {
  public movie: PreviewMovieApiModel = new PreviewMovieApiModel();


  constructor(
    private _previewMovieApiService: PreviewMovieApiService,
    private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.movie = this._previewMovieApiService.getMovie();
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
