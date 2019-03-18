import { Component, OnInit } from '@angular/core';
import {MovieProjection} from '../../../repertoire/models/movie-projection.model';
import {RepertoireService} from '../../../repertoire/services/api-services/repertoire.service';
import {SeanceService} from '../../../repertoire/services/seance.service';
import {RepertoireDaysService} from '../../../repertoire/services/repertoire-days.service';
import {Router} from '@angular/router';
import {Seance} from '../../../repertoire/models/seance.model';
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
    private _repertoireListService: RepertoireService,
    private _seanceService: SeanceService,
    private _repertoireDaysService: RepertoireDaysService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    const repertoire = this._repertoireListService.getRepertoire(1);
    this.repertoire = this._repertoireListService.mapToMovieProjection(repertoire);
    this.repertoireDays = this._repertoireDaysService.getRepertoireDaysSinceNow();
  }

  public getSeanceCssClass(seance: Seance): string {
    switch (this._seanceService.getSeanceStatus(seance)) {
      case SeanceStatus.available:
        return 'available-seance';
      case SeanceStatus.past:
        return 'past-seance';
      case SeanceStatus.running:
        return 'running-seance';
    }
  }

  public bookSeance(seance: Seance): void {
    if (this._seanceService.getSeanceStatus(seance) === SeanceStatus.available) {
      console.log('rezerwacaj seansu o id:', seance.id);
      // this._router.navigate(['/product-details', seance.id]);
    }
  }
}
