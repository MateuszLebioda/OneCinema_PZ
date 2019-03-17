import {Component, OnInit} from '@angular/core';
import {MovieProjectionViewModel} from '../../../../shared/view-models/movie-projection-view-model.model';
import {RepertoireListService} from './services/repertoire-list.service';
import {MovieProjection} from '../../../../shared/models/movie-projection.model';

@Component({
  selector: 'app-repertoire-list',
  templateUrl: './repertoire-list.component.html',
  styleUrls: ['./repertoire-list.component.css']
})
export class RepertoireListComponent implements OnInit {
  public id = 'a';
  public repertoire: MovieProjection[] = [];

  constructor(private _repertoireListService: RepertoireListService) {
  }

  public ngOnInit(): void {
    const repertoire = this._repertoireListService.getRepertoire(1);
    this.repertoire = this._repertoireListService.mapToMovieProjection(repertoire);
    console.log(this.repertoire);
  }

  public funkcja(letter: string, dayNumber: number): void {
    this.id = letter;
    const repertoire = this._repertoireListService.getRepertoire(dayNumber);
    this.repertoire = this._repertoireListService.mapToMovieProjection(repertoire);
  }
}
