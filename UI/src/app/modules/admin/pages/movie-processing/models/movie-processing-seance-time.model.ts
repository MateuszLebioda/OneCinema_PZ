import { ProjectionType } from 'src/app/modules/movie/enums/projection-type.enum';

export class MovieProcessingSeanceTimeModel {
  public projectionType: ProjectionType;
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date();
    this.end = new Date();
  }
}
