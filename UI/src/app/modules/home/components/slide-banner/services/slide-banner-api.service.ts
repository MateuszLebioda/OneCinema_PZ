import {Injectable} from '@angular/core';
import {MovieShortInfoApiModel} from '../../../models/api/movie-short-info-api.model';
import {HomeServicesModule} from '../../../home-services.module';
import {HttpBaseService} from '../../../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: HomeServicesModule
})
export class SlideBannerApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  // public getMovies(): MovieShortInfoApiModel[] {
  //   const result = new Array<MovieShortInfoApiModel>();
  //   result.push({
  //     id: 'sdjdsjsd',
  //     posterUrl: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
  //     title: 'Tytuł 1',
  //     rating: 3,
  //     yearOfPremiere: 2006,
  //     trailerUrl: ''
  //   });
  //
  //   result.push({
  //     id: 'podrpropffd',
  //     posterUrl: 'https://media0ch-a.akamaihd.net/10/14/1707fa9400271dbe6431ee6deb8d2d69.jpg',
  //     title: 'Tytuł 2',
  //     rating: 4,
  //     yearOfPremiere: 2001,
  //     trailerUrl: ''
  //   });
  //
  //   result.push({
  //     id: 'mcbvmcbwwr',
  //     posterUrl: 'http://www.fubiz.net/wp-content/uploads/2016/02/mixedblockbusters-2-900x1273.jpg',
  //     title: 'Tytuł 3',
  //     rating: 5,
  //     yearOfPremiere: 2005,
  //     trailerUrl: ''
  //   });
  //
  //   result.push({
  //     id: 'qasueefvvd',
  //     posterUrl: 'https://dl9fvu4r30qs1.cloudfront.net/46/bc/85b27c604bbf9579d36ab4a1e023/macbeth-poster.jpg',
  //     title: 'Tytuł 4',
  //     rating: 4.5,
  //     yearOfPremiere: 2004,
  //     trailerUrl: ''
  //   });
  //
  //   result.push({
  //     id: 'mzxncbvv',
  //     posterUrl: 'https://mymodernmet.com/wp/wp-content/uploads/2018/01/honest-movie-posters-7.jpg',
  //     title: 'Tytuł 5',
  //     rating: 1,
  //     yearOfPremiere: 2018,
  //     trailerUrl: ''
  //   });
  //
  //   result.push({
  //     id: 'sdjdsjsd',
  //     posterUrl: 'https://media0ch-a.akamaihd.net/33/78/9a295673c9ff94918d47cc565609b3ba.jpg',
  //     title: 'Tytuł 6',
  //     rating: 2,
  //     yearOfPremiere: 2019,
  //     trailerUrl: ''
  //   });
  //
  //   return result;
  // }

  public getMovies(): Observable<MovieShortInfoApiModel[]> {
    return this._httpService.get<MovieShortInfoApiModel[]>('/recommended/get8latest');
  }
}
