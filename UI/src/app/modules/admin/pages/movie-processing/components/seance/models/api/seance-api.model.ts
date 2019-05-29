import {ProjectionType} from '../../../../../../../movie/enums/projection-type.enum';

export class SeanceApiModel {
  public seanceId: string;
  public title: string;
  public projectionType: ProjectionType;
  public start: Date;
  public finish: Date;

  constructor() {
    this.start = new Date();
    this.finish = new Date();
  }
}
