import {PreviewMovieWeekApiModel} from './preview-movie-week-api.model';

export class PreviewMovieScreeningRoomApiModel {
  public id: string;
  public name: string;
  public seances: PreviewMovieWeekApiModel[];

  constructor() {
    this.seances = [];
  }
}
