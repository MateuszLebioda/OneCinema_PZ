import {Component, OnInit} from '@angular/core';
import {SeanceApiModel} from './models/api/seance-api.model';
import {SeanceStatus} from './enums/seance-status.enum';
import {Router} from '@angular/router';
import {RepertoireService} from './services/repertoire.service';
import {RepertoireComponentModel} from './models/repertoire-component.model';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.css']
})
export class RepertoireComponent implements OnInit {
  public data: RepertoireComponentModel = new RepertoireComponentModel();
  public isMobile: boolean;

  constructor(
    private _repertoireService: RepertoireService,
    private _deviceService: DeviceDetectorService,
    private _router: Router) {
  }

  public ngOnInit(): void {
    this.data = this._repertoireService.initComponent();
    this.isMobile = this._deviceService.isMobile();
  }

  public repertoireList(bookmarkLetter: string, dayNumber: number): void {
    this.data.repertoireList = this._repertoireService.getRepertoireList(bookmarkLetter, dayNumber);
  }

  public getSeanceCssClass(seance: SeanceApiModel): string {
    return this._repertoireService.getSeanceCssClass(seance);
  }

  public bookSeance(seance: SeanceApiModel): void {
    if (this._repertoireService.getSeanceStatus(seance) === SeanceStatus.available) {
      console.log('rezerwacaj seansu o id:', seance.id);
      // this._router.navigate(['/product-details', seance.id]);
    }
  }

  public navigateToMovie(movieId: string): void {
    this._router.navigate(['/film', movieId]);
  }
}
