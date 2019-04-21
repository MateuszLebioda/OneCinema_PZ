import {ProjectionType} from '../../../../../../repertoire/enums/projection-type.enum';

export class AddMovieProjectionTimeApiModel {
  public projectionType: ProjectionType;
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date();
    this.end = new Date();
  }
}
