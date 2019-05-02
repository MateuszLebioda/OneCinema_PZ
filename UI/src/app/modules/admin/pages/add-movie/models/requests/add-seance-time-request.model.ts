import {ProjectionType} from '../../../../../movie/enums/projection-type.enum';

export class AddSeanceTimeRequestModel {
  public projectionType: ProjectionType;
  public start: Date;

  constructor() {
    this.start = new Date();
  }
}
