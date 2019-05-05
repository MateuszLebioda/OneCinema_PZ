import {ProjectionType} from '../../../../../movie/enums/projection-type.enum';

export class MovieProcessingSeanceTimeApiModel {
  public projectionType: ProjectionType;
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date();
    this.end = new Date();
  }
}
