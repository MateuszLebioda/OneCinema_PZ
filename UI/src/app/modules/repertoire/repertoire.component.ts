import {Component, OnInit} from '@angular/core';
import {SeanceApiModel} from './models/api/seance-api.model';
import {SeanceStatus} from './enums/seance-status.enum';
import {Router} from '@angular/router';
import {RepertoireService} from './services/repertoire.service';
import {RepertoireComponentModel} from './models/repertoire-component.model';
import {DeviceDetectorService} from 'ngx-device-detector';
import {RepertoireApiService} from './services/repertoire-api.service';
import {MapperService} from '../../shared/helpers/external/mapper/mapper.service';
import {RepertoireListModel} from './models/repertoire-list.model';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.css']
})
export class RepertoireComponent implements OnInit {
  public data: RepertoireComponentModel = new RepertoireComponentModel();
  public isMobile: boolean;

  constructor(
    private _repertoireListService: RepertoireApiService,
    private _repertoireService: RepertoireService,
    private _mapper: MapperService,
    private _deviceService: DeviceDetectorService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.data = this._repertoireService.initComponent();
    this._repertoireListService.getRepertoire(0).subscribe(r => {
      this.data.repertoireList.repertoire = this._mapper.toMovieProjectionCollection(r);
    });
    this.isMobile = this._deviceService.isMobile();
  }

  public repertoireList(bookmarkLetter: string, dayNumber: number): void {
    this._repertoireListService.getRepertoire(dayNumber).subscribe(r => {
      console.log('xd', r);
      const result = new RepertoireListModel();
      result.bookmarkLetter = bookmarkLetter;
      result.repertoire = this._mapper.toMovieProjectionCollection(r);
      this.data.repertoireList = result;
      console.log('reportuarrryk', this.data.repertoireList);
    });
  }

  public getSeanceCssClass(seance: SeanceApiModel): string {
    return this._repertoireService.getSeanceCssClass(seance);
  }

  public bookSeance(seance: SeanceApiModel): void {
    if (this._repertoireService.getSeanceStatus(seance) === SeanceStatus.available) {
      this._router.navigate(['/rezerwacja', seance.id]);
    }
  }

  public navigateToMovie(movieId: string): void {
    this._router.navigate(['/film', movieId]);
  }
}
