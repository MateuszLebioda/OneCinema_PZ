import {FormGroup} from '@angular/forms';
import {AddMovieApiModel} from './api/add-movie-api.model';
import {SelectedDayMoviesProjectionsModel} from './selected-day-movies-projections.model';
import {SeanceRoomApiModel} from './api/seance-room-api.model';

export class MovieProjectionPublicProperties {
  public bookingForm: FormGroup;
  public addMovieApiModel: AddMovieApiModel = new AddMovieApiModel();
  public selectedDayMoviesProjectionsModel: SelectedDayMoviesProjectionsModel = new SelectedDayMoviesProjectionsModel();
  public selectedWeek = 1;
  public selectedDay = 1;
  public seanceRooms: SeanceRoomApiModel[] = [];
}
