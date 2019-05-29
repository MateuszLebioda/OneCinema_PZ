import {Component, OnInit} from '@angular/core';
import {MovieProjection} from '../../../repertoire/models/movie-projection.model';
import {RepertoireApiService} from '../../../repertoire/services/repertoire-api.service';
import {Router} from '@angular/router';
import {SeanceApiModel} from '../../../repertoire/models/api/seance-api.model';
import {SeanceStatus} from '../../../repertoire/enums/seance-status.enum';
import {RepertoireService} from '../../../repertoire/services/repertoire.service';
import {DeviceDetectorService} from 'ngx-device-detector';
import {MapperService} from '../../../../shared/helpers/external/mapper/mapper.service';

@Component({
  selector: 'app-todays-repertoire',
  templateUrl: './todays-repertoire.component.html',
  styleUrls: ['./todays-repertoire.component.css']
})
export class TodaysRepertoireComponent implements OnInit {
  public repertoire: MovieProjection[] = [];
  public repertoireDays: string[];
  public isMobile: boolean;

  constructor(
    private _repertoireListService: RepertoireApiService,
    private _repertoireService: RepertoireService,
    private _deviceService: DeviceDetectorService,
    private _mapper: MapperService,
    private _router: Router) {
  }

  ngOnInit() {
    this._repertoireListService.getRepertoire(0).subscribe(r => {
      console.log('przed', r);
      this.repertoire = this._mapper.toMovieProjectionCollection(r);
      console.log('po', this.repertoire);
    });
    this.repertoireDays = this._repertoireService.getRepertoireDaysSinceNow();
    this.isMobile = this._deviceService.isMobile();
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

  public navigateToMovie(movieId: string): void {
    this._router.navigate(['/film', movieId]);
  }
}
