import {FormControl, FormGroup} from '@angular/forms';
import {SelectedDaySeancesModel} from './selected-day-seances.model';
import {SeanceRoomApiModel} from './api/seance-room-api.model';
import {ProjectionType} from '../../../../../../movie/enums/projection-type.enum';

export class SeanceComponentDataModel {
  public bookingForm: FormGroup;
  public selectedDaySeancesModel: SelectedDaySeancesModel;
  public selectedWeekNumber: number;
  public selectedDayNumber: number;
  public selectedProjectionType: ProjectionType;
  public seanceRooms: SeanceRoomApiModel[];
  public weekDays: number[];
  public movieDuration: FormControl;
  public currentDayNumber: number;

  constructor() {
    this.selectedDayNumber = 1;
    this.selectedWeekNumber = 0;
    this.selectedProjectionType = ProjectionType.type2D;
    this.selectedDaySeancesModel = new SelectedDaySeancesModel();

    this.seanceRooms = [];
    this.weekDays = [1, 2, 3, 4, 5, 6, 7];
    this.movieDuration = new FormControl();
  }
}
