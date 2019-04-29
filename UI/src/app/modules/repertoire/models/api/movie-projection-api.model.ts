import {SeanceApiModel} from './seance-api.model';
import {ProjectionType} from '../../../movie/enums/projection-type.enum';
import {MovieGender} from '../../../movie/enums/movie-gender.enum';

export class MovieProjectionApiModel {
  public movieId: string;
  public movieTitle: string;
  public projectionType: ProjectionType;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieGenders: MovieGender[];
  public seances: SeanceApiModel[];

  constructor() {
    this.movieGenders = [];
    this.seances = [];
  }
}
