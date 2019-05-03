import {Component, Input, OnInit} from '@angular/core';
import {SeanceComponentDataModel} from '../../../add-movie/components/seance/models/seance-component-data.model';
import {ProjectionType} from '../../../../../movie/enums/projection-type.enum';
import {SeanceService} from '../../../add-movie/components/seance/services/seance.service';
import {Router} from '@angular/router';
import {PreviewMovieScreeningRoomApiModel} from '../../models/api/preview-movie-screening-room-api.model';
import {PreviewMovieWeekApiModel} from '../../models/api/preview-movie-week-api.model';
import {PreviewMovieSeancesService} from './services/preview-movie-seances.service';
import {WeekDays} from '../../../add-movie/components/seance/enums/week-days.enum';

@Component({
  selector: 'app-preview-movie-seances',
  templateUrl: './preview-movie-seances.component.html',
  styleUrls: ['./preview-movie-seances.component.css']
})
export class PreviewMovieSeancesComponent implements OnInit {
  @Input() screeningRooms: PreviewMovieScreeningRoomApiModel[] = [];

  public get seances(): PreviewMovieWeekApiModel[] {
    return this._seances;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();
  public ProjectionType = ProjectionType;

  private _seances: PreviewMovieWeekApiModel[] = [];

  constructor(
    private _seanceService: SeanceService,
    private _previewMovieSeancesService: PreviewMovieSeancesService,
    private _router: Router) {
  }

  ngOnInit() {
    this._seances = this.screeningRooms.length > 0 ? this.screeningRooms[0].seances : [];
  }


  public getPolishDayName(day: WeekDays) {
    return this._previewMovieSeancesService.convertToPolishDayName(day);
  }

  public setScreeningRoom(screeningRoomId: string) {
    const indexOfSelectedScreeningRoom = this.screeningRooms.findIndex(screeningRoom => screeningRoom.id === screeningRoomId);

    if (indexOfSelectedScreeningRoom >= 0) {
      this._seances = this.screeningRooms[indexOfSelectedScreeningRoom].seances;
    }
  }
}
