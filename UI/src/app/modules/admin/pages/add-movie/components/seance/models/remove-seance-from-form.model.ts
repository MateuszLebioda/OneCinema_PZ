import {FormGroup} from '@angular/forms';
import { AddMovieProjectionTimeModel } from './add-movie-projection-time.model';

export class RemoveSeanceFromFormModel {
  public form: FormGroup;
  public week: number;
  public day: number;
  public seanceToRemove: AddMovieProjectionTimeModel;

  constructor() {
    this.seanceToRemove = new AddMovieProjectionTimeModel();
  }
}
