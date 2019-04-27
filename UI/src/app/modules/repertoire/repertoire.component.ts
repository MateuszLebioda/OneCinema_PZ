import {Component, OnInit} from '@angular/core';
import {MovieProjection} from './models/movie-projection.model';
import {RepertoireApiService} from './services/repertoire-api.service';
import {SeanceService} from './services/seance.service';
import {SeanceApiModel} from './models/api-models/seance-api.model';
import {RepertoireDaysService} from './services/repertoire-days.service';
import {SeanceStatus} from './enums/seance-statu.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-repertoire',
  templateUrl: './repertoire.component.html',
  styleUrls: ['./repertoire.component.css']
})
export class RepertoireComponent implements OnInit {
  public bookmarkLetters: string[] = ['a', 'b', 'c', 'd', 'e', 'formControls', 'g', 'h'];
  public bookmarkLetter = 'a';
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

  public repertoireList(bookmarkLetter: string, dayNumber: number): void {
    this.bookmarkLetter = bookmarkLetter;
    this.repertoire = this._repertoireListService.getRepertoire(dayNumber);
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

  public navigateToMovie(movieId: string): void {
    this._router.navigate(['/film', movieId]);
  }
}
