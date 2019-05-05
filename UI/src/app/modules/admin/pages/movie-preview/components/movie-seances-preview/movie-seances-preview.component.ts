import {Component, Input, OnInit} from '@angular/core';
import {SeanceComponentDataModel} from '../../../movie-processing/components/seance/models/seance-component-data.model';
import {ProjectionType} from '../../../../../movie/enums/projection-type.enum';
import {SeanceService} from '../../../movie-processing/components/seance/services/seance.service';
import {Router} from '@angular/router';
import {PreviewMovieScreeningRoomApiModel} from '../../models/api/preview-movie-screening-room-api.model';
import {PreviewMovieWeekApiModel} from '../../models/api/preview-movie-week-api.model';
import {MovieSeancesPreviewService} from './services/movie-seances-preview.service';
import {WeekDays} from '../../../movie-processing/components/seance/enums/week-days.enum';

@Component({
  selector: 'app-preview-movie-seances',
  templateUrl: './movie-seances-preview.component.html',
  styleUrls: ['./movie-seances-preview.component.css']
})
export class MovieSeancesPreviewComponent implements OnInit {
  @Input() screeningRooms: PreviewMovieScreeningRoomApiModel[] = [];

  public get seances(): PreviewMovieWeekApiModel[] {
    return this._seances;
  }

  public data: SeanceComponentDataModel = new SeanceComponentDataModel();
  public ProjectionType = ProjectionType;

  private _seances: PreviewMovieWeekApiModel[] = [];

  constructor(
    private _seanceService: SeanceService,
    private _previewMovieSeancesService: MovieSeancesPreviewService,
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
