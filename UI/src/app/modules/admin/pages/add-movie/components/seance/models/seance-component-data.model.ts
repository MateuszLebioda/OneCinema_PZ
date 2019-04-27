import {FormGroup} from '@angular/forms';
import {AddMovieApiModel} from './api/add-movie-api.model';
import {SelectedDaySeancesModel} from './selected-day-seances.model';
import {SeanceRoomApiModel} from './api/seance-room-api.model';

export class SeanceComponentDataModel {
  public bookingForm: FormGroup;
  public addMovieApiModel: AddMovieApiModel = new AddMovieApiModel();
  public selectedDayMoviesProjectionsModel: SelectedDaySeancesModel = new SelectedDaySeancesModel();
  public selectedWeek = 1;
  public selectedDay = 1;
  public seanceRooms: SeanceRoomApiModel[] = [];
}
