import {FormControl, FormGroup} from '@angular/forms';
import {SelectedDaySeancesModel} from './selected-day-seances.model';
import {ScreeningRoomApiModel} from './api/screening-room-api.model';
import {ProjectionType} from '../../../../../../movie/enums/projection-type.enum';

export class SeanceComponentDataModel {
  public bookingForm: FormGroup;
  public selectedDaySeances: SelectedDaySeancesModel;
  public selectedWeekNumber: number;
  public selectedDayNumber: number;
  public selectedProjectionType: ProjectionType;
  public screeningRooms: ScreeningRoomApiModel[];
  public weekDays: number[];
  public movieDuration: FormControl;
  public currentDayNumber: number;
  public weekCount: number;

  constructor() {
    this.selectedDayNumber = 1;
    this.selectedWeekNumber = 0;
    this.selectedProjectionType = ProjectionType.type2D;
    this.selectedDaySeances = new SelectedDaySeancesModel();

    this.screeningRooms = [];
    this.weekDays = [1, 2, 3, 4, 5, 6, 7];
    this.movieDuration = new FormControl();
    this.weekCount = 1;
  }
}
