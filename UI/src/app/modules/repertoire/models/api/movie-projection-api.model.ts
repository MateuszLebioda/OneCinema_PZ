import { SeanceApiModel } from './seance-api.model';
import { ProjectionType } from '../../enums/projection-type.enum';
import { MovieGender } from '../../enums/movie-gender.enum';

export class MovieProjectionApiModel {
  public movieId: string;
  public movieTitle: string;
  public projectionType: ProjectionType;
  public moviePosterUrl: string;
  public movieDuration: number;
  public movieGenders: MovieGender[];
  public seances: SeanceApiModel[];

  constructor() {
    this.seances = [];
  }
}
