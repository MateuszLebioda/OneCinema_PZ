import {Component, OnInit} from '@angular/core';
import {RepertoireService} from '../../../../shared/services/repertoire.service';
import {MovieProjection} from '../../../../shared/models/movie-projection.model';
import {SeanceService} from '../../../../shared/services/seance.service';
import {Seance} from '../../../../shared/models/seance.model';

@Component({
  selector: 'app-repertoire-list',
  templateUrl: './repertoire-list.component.html',
  styleUrls: ['./repertoire-list.component.css']
})
export class RepertoireListComponent implements OnInit {
  public id = 'a';
  public repertoire: MovieProjection[] = [];

  constructor(private _repertoireListService: RepertoireService, private _seanceService: SeanceService) {
  }

  public ngOnInit(): void {
    const repertoire = this._repertoireListService.getRepertoire(1);
    this.repertoire = this._repertoireListService.mapToMovieProjection(repertoire);
  }

  public funkcja(letter: string, dayNumber: number): void {
    this.id = letter;
    const repertoire = this._repertoireListService.getRepertoire(dayNumber);
    this.repertoire = this._repertoireListService.mapToMovieProjection(repertoire);
  }

  public getSeanceCssClass(seance: Seance): string {
    return this._seanceService.getSeanceCssClass(seance);
  }
}
