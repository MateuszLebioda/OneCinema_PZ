import {FormGroup} from '@angular/forms';
import {AddMovieProjectionTimeApiModel} from './api/add-movie-projection-time-api.model';

export class RemoveSeanceFromFormModel {
  public form: FormGroup;
  public week: number;
  public day: number;
  public seanceToRemove: AddMovieProjectionTimeApiModel;

  constructor() {
    this.seanceToRemove = new AddMovieProjectionTimeApiModel();
  }
}
