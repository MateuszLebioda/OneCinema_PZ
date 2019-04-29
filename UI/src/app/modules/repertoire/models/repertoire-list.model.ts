import {MovieProjection} from './movie-projection.model';

export class RepertoireListModel {
  public bookmarkLetter;
  public repertoire: MovieProjection[];

  constructor() {
    this.bookmarkLetter = 'a';
    this.repertoire = [];
  }
}
