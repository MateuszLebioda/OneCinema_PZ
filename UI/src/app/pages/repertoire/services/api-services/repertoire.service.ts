import {Injectable} from '@angular/core';
import {MovieProjectionApiModel} from '../../api-models/movie-projection-api.model';
import {HttpClient} from '@angular/common/http';
import {HttpBaseService} from '../../../../shared/services/http-base.service';
import {MovieProjection} from '../../models/movie-projection.model';
import {MapperService} from '../../../../shared/helpers/mapper/mapper.service';

@Injectable({
  providedIn: 'root'
})
export class RepertoireService extends HttpBaseService {

  constructor(private http: HttpClient, private _mapper: MapperService) {
    super(http);
  }

  public getRepertoire(dayNumber: number): MovieProjection[] {
    const repertoire = new Array<MovieProjectionApiModel>();

    repertoire.push({
      movieId: 'id1',
      movieCategory: 'Akcji',
      movieDuration: 120,
      moviePosterUrl: 'https://static.pressfrom.info/upload/images/real/2019/03/14/fans-angry-danai-gurira-s-name-isn-t-atop-avengers-endgame-poster__701824_.jpg?content=1',
      movieTitle: 'Avengers',
      projectionType: '2D',
      seances: [
        {
          start: new Date('March 17, 2019 18:05:00'),
          finish: new Date('March 17, 2019 20:05:00'),
          id: '8823242'
        },
        {
          start: new Date('March 17, 2019 15:05:00'),
          finish: new Date('March 17, 2019 16:05:00'),
          id: '54543242'
        },
        {
          start: new Date('March 18, 2019 20:05:00'),
          finish: new Date('March 18, 2019 22:05:00'),
          id: '12223242'
        }
      ]
    });

    if (dayNumber === 2) {
      repertoire.push({
        movieId: 'id2',
        movieCategory: 'Komedia', movieDuration: 150,
        moviePosterUrl: 'https://static.posters.cz/image/750/plakaty/kac-vegas-ii-plakat-i12276.jpg',
        movieTitle: 'Jaś fasola', projectionType: '3D',
        seances: [
          {
            start: new Date('March 17, 2019 11:05:00'),
            finish: new Date('March 17, 2019 15:05:00'),
            id: '32223242'
          },
        ]
      });
    }

    return this._mapper.toMovieProjectionCollection(repertoire);
  }

  // private temp() {
  //   JSON.stringify(model); // zamienia na JSON
  // }
}
