import {FormGroup} from '@angular/forms';
import { MovieProcessingSeanceTimeModel } from '../../../models/movie-processing-seance-time.model';

export class RemoveSeanceFromFormModel {
  public form: FormGroup;
  public screeningRoomId: string;
  public week: number;
  public day: number;
  public seanceToRemove: MovieProcessingSeanceTimeModel;
  public removedSeances: string[];

  constructor() {
    this.seanceToRemove = new MovieProcessingSeanceTimeModel();
  }
}
