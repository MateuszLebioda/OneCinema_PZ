import {ProjectionType} from '../../../../../../../repertoire/enums/projection-type.enum';

export class SeanceApiModel {
  public title: string;
  public projectionType: ProjectionType;
  public start: Date;
  public end: Date;

  constructor() {
    this.start = new Date();
    this.end = new Date();
  }
}
