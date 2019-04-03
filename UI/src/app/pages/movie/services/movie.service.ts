import {Injectable} from '@angular/core';
import {Movie} from '../models/movie.model';
import {RepertoireService} from '../../repertoire/services/api-services/repertoire.service';
import {MapperService} from '../../../shared/helpers/mapper/mapper.service';
import {DaySeancesApiModel} from '../api-models/day-seances-api.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private _temp: RepertoireService, private _mapper: MapperService) {
  }

  public getMovie(): Movie {
    const x1 = new DaySeancesApiModel();
    x1.day = 0;
    x1.seances = [
      {
        start: new Date('April 3, 2019 23:05:00'),
        finish: new Date('April 3, 2019 23:55:00'),
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
    ];

    const x2 = new DaySeancesApiModel();
    x2.day = 1;
    x2.seances = [
      {
        start: new Date('March 17, 2019 18:05:00'),
        finish: new Date('March 17, 2019 20:05:00'),
        id: '425'
      },
    ];

    return {
      title: 'Avengers',
      gender: 'Akcji, Kryminał',
      duration: 180,
      posterUrl: 'https://www.vintagemovieposters.co.uk/wp-content/uploads/2018/04/IMG_3059-482x714.jpg',
      trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
      rating: 3.5,
      seances2D: [this._mapper.toDaySeances(x1), this._mapper.toDaySeances(x2)],
      seances3D: [this._mapper.toDaySeances(x1)]
    };
  }
}
