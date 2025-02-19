import {Injectable} from '@angular/core';
import {SeanceApiModel} from '../models/api/seance-api.model';
import {SeanceStatus} from '../enums/seance-status.enum';
import {RepertoireComponentModel} from '../models/repertoire-component.model';
import {RepertoireApiService} from './repertoire-api.service';
import {RepertoireListModel} from '../models/repertoire-list.model';
import {MapperService} from '../../../shared/helpers/external/mapper/mapper.service';

@Injectable({
  providedIn: 'root'
})
export class RepertoireService {
  private readonly maxBookingOffsetInMilliseconds = 1800000;
  private readonly _numberOfDaysPresentingRepertoireStartingFromZero = 7;
  private readonly _weekDays = [
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
  ];


  constructor(
    private _repertoireListService: RepertoireApiService,
    private _mapper: MapperService) {
  }

  public initComponent(): RepertoireComponentModel {
    const result = new RepertoireComponentModel();
    result.repertoireDays = this.getRepertoireDaysSinceNow();

    return result;
  }

  public getRepertoireList(bookmarkLetter: string, dayNumber: number): RepertoireListModel {
    const result = new RepertoireListModel();
    result.bookmarkLetter = bookmarkLetter;
    this._repertoireListService.getRepertoire(dayNumber).subscribe(r => {
      result.repertoire = this._mapper.toMovieProjectionCollection(r);
    });

    return result;
  }

  public getSeanceCssClass(seance: SeanceApiModel): string {
    switch (this.getSeanceStatus(seance)) {
      case SeanceStatus.available:
        return 'available-seance';
      case SeanceStatus.past:
        return 'past-seance';
      case SeanceStatus.running:
        return 'running-seance';
    }
  }

  public getSeanceStatus(seanceDate: SeanceApiModel): SeanceStatus {
    const currentTimeInMilliseconds = Date.now();
    const seanceStartDateTimeInMilliseconds = seanceDate.start.getTime();
    const seanceFinishDateTimeInMilliseconds = seanceDate.finish.getTime();
    const maxBookingTime = currentTimeInMilliseconds + this.maxBookingOffsetInMilliseconds;

    if (seanceStartDateTimeInMilliseconds > maxBookingTime) {
      return SeanceStatus.available;
    } else if (currentTimeInMilliseconds < seanceFinishDateTimeInMilliseconds) {
      return SeanceStatus.running;
    } else {
      return SeanceStatus.past;
    }
  }

  public getRepertoireDaysSinceNow(): string[] {
    const currentDayNumber = new Date().getDay();
    const result = new Array<string>();

    for (let dayIndex = currentDayNumber; dayIndex <= currentDayNumber + this._numberOfDaysPresentingRepertoireStartingFromZero; dayIndex++) {
      result.push(this._weekDays[dayIndex]);
    }
    return result;
  }
}
