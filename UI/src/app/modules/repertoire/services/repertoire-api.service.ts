import {Injectable} from '@angular/core';
import {MovieProjectionApiModel} from '../models/api/movie-projection-api.model';
import {MovieProjection} from '../models/movie-projection.model';
import {MapperService} from '../../../shared/helpers/external/mapper/mapper.service';
import {RepertoireServicesModule} from '../repertoire-services.module';
import {MovieGender} from '../../movie/enums/movie-gender.enum';
import {ProjectionType} from '../../movie/enums/projection-type.enum';
import {HttpBaseService} from '../../../core/services/http-base.service';
import {Observable} from 'rxjs/internal/Observable';

@Injectable({
  providedIn: RepertoireServicesModule
})
export class RepertoireApiService {

  constructor(
    private _httpService: HttpBaseService,
    private _mapper: MapperService) {
  }

  public getRepertoire(dayNumber: number): MovieProjection[] {
    const repertoire = new Array<MovieProjectionApiModel>();

    repertoire.push({
      movieId: 'id1',
      movieGenders: [MovieGender.Action, MovieGender.Adventure],
      movieDuration: 120,
      moviePosterUrl: 'https://static.pressfrom.info/upload/images/real/2019/03/14/fans-angry-danai-gurira-s-name-isn-t-atop-avengers-endgame-poster__701824_.jpg?content=1',
      movieTitle: 'Avengers',
      projectionType: ProjectionType.type2D,
      seances: [
        {
          start: new Date('May 2, 2019 19:05:00'),
          finish: new Date('May 2, 2019 23:05:00'),
          id: '8823242'
        },
        {
          start: new Date('May 2, 2019 20:05:00'),
          finish: new Date('May 2, 2019 23:05:00'),
          id: '54543242'
        },
        {
          start: new Date('May 2, 2019 15:05:00'),
          finish: new Date('May 2, 2019 18:05:00'),
          id: '12223242'
        }
      ]
    });

    if (dayNumber === 2) {
      repertoire.push({
        movieId: 'id2',
        movieGenders: [MovieGender.Historical],
        movieDuration: 150,
        moviePosterUrl: 'https://static.posters.cz/image/750/plakaty/kac-vegas-ii-plakat-i12276.jpg',
        movieTitle: 'Jaś fasola',
        projectionType: ProjectionType.type3D,
        seances: [
          {
            start: new Date('April 1, 2019 11:05:00'),
            finish: new Date('April 1, 2019 15:05:00'),
            id: '32223242'
          },
        ]
      });
    }

    return this._mapper.toMovieProjectionCollection(repertoire);
  }

  public getRepertoire2(dayNumber: number): Observable<MovieProjection[]> {
    return this._httpService.get<MovieProjection[]>('');
  }

  // private temp() {
  //   JSON.stringify(model); // zamienia na JSON
  // }
}
