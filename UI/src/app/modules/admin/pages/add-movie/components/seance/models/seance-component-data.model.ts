import {FormGroup} from '@angular/forms';
import {AddMovieApiModel} from './api/add-movie-api.model';
import {SelectedDaySeancesModel} from './selected-day-seances.model';
import {SeanceRoomApiModel} from './api/seance-room-api.model';

export class SeanceComponentDataModel {
  public bookingForm: FormGroup;
  public addMovieApiModel: AddMovieApiModel = new AddMovieApiModel();
  public selectedDaySeancesModel: SelectedDaySeancesModel = new SelectedDaySeancesModel();
  public selectedWeekNumber = 1;
  public selectedDayNumber = 1;
  public selectedDate: Date = new Date();
  public seanceRooms: SeanceRoomApiModel[] = [];
  public weekDays: number[] = [1, 2, 3, 4, 5, 6, 7];
  public movieDuration: number;
  public selectedSeanceRoom: SeanceRoomApiModel = new SeanceRoomApiModel();
}
