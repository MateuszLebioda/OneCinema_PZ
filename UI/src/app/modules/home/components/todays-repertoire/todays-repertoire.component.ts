import {Component, OnInit} from '@angular/core';
import {MovieProjection} from '../../../repertoire/models/movie-projection.model';
import {RepertoireApiService} from '../../../repertoire/services/repertoire-api.service';
import {SeanceService} from '../../../repertoire/services/seance.service';
import {RepertoireDaysService} from '../../../repertoire/services/repertoire-days.service';
import {Router} from '@angular/router';
import {SeanceApiModel} from '../../../repertoire/models/api-models/seance-api.model';
import {SeanceStatus} from '../../../repertoire/enums/seance-statu.enum';

@Component({
  selector: 'app-todays-repertoire',
  templateUrl: './todays-repertoire.component.html',
  styleUrls: ['./todays-repertoire.component.css']
})
export class TodaysRepertoireComponent implements OnInit {
  public repertoire: MovieProjection[];
  public repertoireDays: string[];

  constructor(
    private _repertoireListService: RepertoireApiService,
    private _seanceService: SeanceService,
    private _repertoireDaysService: RepertoireDaysService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.repertoire = this._repertoireListService.getRepertoire(1);
    this.repertoireDays = this._repertoireDaysService.getRepertoireDaysSinceNow();
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
      this._router.navigate(['/rezerwacja', seance.id]);
    }
  }

  public navigateToMovie(movieId: string): void {
    this._router.navigate(['/film', movieId]);
  }
}
