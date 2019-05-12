import {SeanceApiModel} from './seance-api.model';
import {ProjectionType} from '../../../movie/enums/projection-type.enum';

export class MovieProjectionApiModel {
  public movieId: string;
  public movieTitle: string;
  public projectionType: ProjectionType;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieGenders: string[];
  public seances: SeanceApiModel[];

  constructor() {
    this.movieGenders = [];
    this.seances = [];
  }
}
