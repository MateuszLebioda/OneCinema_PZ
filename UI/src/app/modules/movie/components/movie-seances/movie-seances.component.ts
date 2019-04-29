import {Component, Input, OnInit} from '@angular/core';
import {RepertoireApiService} from '../../../repertoire/services/repertoire-api.service';
import {Router} from '@angular/router';
import {SeanceApiModel} from '../../../repertoire/models/api/seance-api.model';
import {SeanceStatus} from '../../../repertoire/enums/seance-status.enum';
import {SeancesPerDay} from '../../models/seances-per-day.model';
import {SeancesPerTimesOfDay} from '../../../repertoire/models/seances-per-times-of-day';
import {RepertoireService} from '../../../repertoire/services/repertoire.service';

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

  public bookmarkLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'formControls', 'g', 'h'];
  public bookmarkLetter = 'a';
  public repertoireDays: string[];

  private _deyIndex = 0;

  constructor(
    private _repertoireListService: RepertoireApiService,
    private _repertoireService: RepertoireService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.repertoireDays = this._repertoireService.getRepertoireDaysSinceNow();
  }

  public repertoireList(bookmarkLetter: string, dayNumber: number): void {
    this.bookmarkLetter = bookmarkLetter;
    this._deyIndex = dayNumber;
  }

  public getSeanceCssClass(seance: SeanceApiModel): string {
    switch (this._repertoireService.getSeanceStatus(seance)) {
      case SeanceStatus.available:
        return 'available-seance';
      case SeanceStatus.past:
        return 'past-seance';
      case SeanceStatus.running:
        return 'running-seance';
    }
  }

  public bookSeance(seance: SeanceApiModel): void {
    if (this._repertoireService.getSeanceStatus(seance) === SeanceStatus.available) {
      console.log('rezerwacaj seansu o id:', seance.id);
      this._router.navigate(['/rezerwacja', seance.id]);
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
