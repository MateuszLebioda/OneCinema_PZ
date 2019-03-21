import {Injectable} from '@angular/core';
import * as automapper from 'automapper-ts';
import {MovieProjectionApiModel} from '../../../pages/repertoire/api-models/movie-projection-api.model';
import {MovieProjection} from '../../../pages/repertoire/models/movie-projection.model';
import {AutomapperMaps} from './automapper-maps';
import {PropertiesMapper} from './properties-mapper';
import {MovieApiModel} from '../../../pages/movie/api-models/movie-api.model';
import {Movie} from '../../../pages/movie/models/movie.model';
import {SeancesPerDay} from '../../../pages/movie/models/seances-per-day.model';
import {DaySeancesApiModel} from '../../../pages/movie/api-models/day-seances-api.model';

@Injectable({
  providedIn: 'root'
})
export class MapperService {

  constructor() {
    AutomapperMaps.InitializeMaps();
  }

  public toMovieProjection(source: MovieProjectionApiModel): MovieProjection {
    const destination: MovieProjection = automapper.map(MovieProjectionApiModel.name, MovieProjection.name, source);
    destination.seances = PropertiesMapper.getSeancesPerTimesOfDay(source.seances);
    return destination;
  }

  public toMovieProjectionCollection(source: MovieProjectionApiModel[]): MovieProjection[] {
    const destination: MovieProjection[] = [];
    source.forEach((value => destination.push(this.toMovieProjection(value))));
    return destination;
  }

  public toMovie(source: MovieApiModel): Movie {
    const destination: Movie = automapper.map(MovieApiModel.name, Movie.name, source);
    destination.seances.forEach((value, index) => {
      value = this.toDaySeances(source[index]);
    });

    return destination;
  }

  public toDaySeances(source: DaySeancesApiModel): SeancesPerDay {
    const destination: SeancesPerDay = automapper.map(DaySeancesApiModel.name, SeancesPerDay.name, source);
    destination.seances = PropertiesMapper.getSeancesPerTimesOfDay(source.seances);

    return destination;
  }
}
