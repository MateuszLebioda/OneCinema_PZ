import {Injectable} from '@angular/core';
import {MovieShortInfoApiModel} from '../../../models/api/movie-short-info-api.model';

@Injectable({
  providedIn: 'root'
})
export class BannerApiService {

  constructor() {
  }

  public getMovies(): MovieShortInfoApiModel[] {
    const result = new Array<MovieShortInfoApiModel>();
    result.push({
      id: 'sdjdsjsd',
      posterUrl: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
      title: 'Tytuł 1',
      rating: 3,
      yearOfPremiere: 2010,
      trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c'
    });

    result.push({
      id: 'podrpropffd',
      posterUrl: 'https://media0ch-a.akamaihd.net/10/14/1707fa9400271dbe6431ee6deb8d2d69.jpg',
      title: 'Tytuł 2',
      rating: 3,
      yearOfPremiere: 2010,
      trailerUrl: 'https://www.youtube.com/embed/FvvZaBf9QQI'
    });

    result.push({
      id: 'mcbvmcbwwr',
      posterUrl: 'http://www.fubiz.net/wp-content/uploads/2016/02/mixedblockbusters-2-900x1273.jpg',
      title: 'Tytuł 3',
      rating: 3,
      yearOfPremiere: 2010,
      trailerUrl: 'https://www.youtube.com/embed/H6MLJG0RdDE'
    });

    result.push({
      id: 'qasueefvvd',
      posterUrl: 'https://dl9fvu4r30qs1.cloudfront.net/46/bc/85b27c604bbf9579d36ab4a1e023/macbeth-poster.jpg',
      title: 'Tytuł 4',
      rating: 3,
      yearOfPremiere: 2010,
      trailerUrl: 'https://www.youtube.com/embed/N5aD9ppoQIo'
    });

    return result;
  }
}
