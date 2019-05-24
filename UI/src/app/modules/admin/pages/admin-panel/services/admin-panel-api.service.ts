import {Injectable} from '@angular/core';
import {MovieApiModel} from '../models/api/movie-api.model';
import {AdminServicesModule} from '../../../admin-services.module';
import {HttpBaseService} from '../../../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: AdminServicesModule
})
export class AdminPanelApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  // public getMovies(): MovieApiModel[] {
  //   return [
  //     {
  //       id: 'qp84cw6aq65',
  //       title: 'Avengers'
  //     },
  //     {
  //       id: 'ddbdj8ac4d',
  //       title: 'Jaś Fasola'
  //     }
  //   ];
  // }

  public getMovies(): Observable<MovieApiModel[]> {
    return this._httpService.get('films/simpleMovieList');
  }

  public deleteMovie(movieId: string): Observable<void> {
    return this._httpService.delete(`/delete/${movieId}`);
  }
}
