import {Component, Input, OnInit} from '@angular/core';
import {MovieProjection} from '../../../repertoire/models/movie-projection.model';
import {RepertoireService} from '../../../repertoire/services/api-services/repertoire.service';
import {SeanceService} from '../../../repertoire/services/seance.service';
import {RepertoireDaysService} from '../../../repertoire/services/repertoire-days.service';
import {Router} from '@angular/router';
import {SeanceApiModel} from '../../../repertoire/api-models/seance-api.model';
import {SeanceStatus} from '../../../repertoire/enums/seance-statu.enum';
import {SeancesPerDay} from '../../models/seances-per-day.model';
import {SeancesPerTimesOfDay} from '../../../repertoire/models/seances-per-times-of-day';

@Component({
  selector: 'app-movie-seances',
  templateUrl: './movie-seances.component.html',
  styleUrls: ['./movie-seances.component.css']
})
export class MovieSeancesComponent implements OnInit {
  @Input() seances2D: SeancesPerDay[] = [];
  @Input() seances3D: SeancesPerDay[] = [];

  public get seances2DPerTimesOfDay(): SeancesPerTimesOfDay {
    return this._getSeance(this.seances2D).seances;
  }

  public get seances3DPerTimesOfDay(): SeancesPerTimesOfDay {
    return this._getSeance(this.seances3D).seances;
  }

  public get areSeances2D(): boolean {
    return this._areSeances(this.seances2D);
  }

  public get areSeances3D(): boolean {
    return this._areSeances(this.seances3D);
  }

  public bookmarkLetter = 'a';
  public repertoireDays: string[];

  private _deyIndex = 0;

  constructor(
    private _repertoireListService: RepertoireService,
    private _seanceService: SeanceService,
    private _repertoireDaysService: RepertoireDaysService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.repertoireDays = this._repertoireDaysService.getRepertoireDaysSinceNow();
  }

  public repertoireList(bookmarkLetter: string, dayNumber: number): void {
    this.bookmarkLetter = bookmarkLetter;
    this._deyIndex = dayNumber;
  }

  public getSeanceCssClass(seance: SeanceApiModel): string {
    switch (this._seanceService.getSeanceStatus(seance)) {
      case SeanceStatus.available:
        return 'available-seance';
      case SeanceStatus.past:
        return 'past-seance';
      case SeanceStatus.running:
        return 'running-seance';
    }
  }

  public bookSeance(seance: SeanceApiModel): void {
    if (this._seanceService.getSeanceStatus(seance) === SeanceStatus.available) {
      console.log('rezerwacaj seansu o id:', seance.id);
      // this._router.navigate(['/product-details', seance.id]);
    }
  }

  private _getSeance(seancesPerDay: SeancesPerDay[]): SeancesPerDay {
    return seancesPerDay.find(x => x.day === this._deyIndex);
  }

  private _areSeances(seancesPerDay: SeancesPerDay[]): boolean {
    const seances = seancesPerDay.find(x => x.day === this._deyIndex);
    if (seances) {
      return seances.seances.seancesUntilNoon.length !== 0
        || seances.seances.seancesAfternoon.length !== 0
        || seances.seances.seancesEvening.length !== 0;
    }
    return false;
  }
}
