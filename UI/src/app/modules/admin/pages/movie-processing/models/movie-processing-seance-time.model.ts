import { ProjectionType } from 'src/app/modules/movie/enums/projection-type.enum';

export class MovieProcessingSeanceTimeModel {
  public seanceId: string;
  public projectionType: ProjectionType;
  public start: Date;
  public finish: Date;

  constructor() {
    this.start = new Date();
    this.finish = new Date();
  }
}
