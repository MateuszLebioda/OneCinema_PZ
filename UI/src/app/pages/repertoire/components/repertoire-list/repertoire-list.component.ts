import { Component, OnInit } from '@angular/core';
import {MovieProjection} from '../../../../shared/models/movie-projection.model';
import {RepertoireListService} from './services/repertoire-list.service';

@Component({
  selector: 'app-repertoire-list',
  templateUrl: './repertoire-list.component.html',
  styleUrls: ['./repertoire-list.component.css']
})
export class RepertoireListComponent implements OnInit {
  public id = 'a';
  public repertoire: MovieProjection[] = [];

  constructor(private _repertoireListService: RepertoireListService) { }

  public ngOnInit(): void {
    this.repertoire = this._repertoireListService.getRepertoire(1);
  }

  public funkcja(letter: string, dayNumber: number): void {
    this.id = letter;
    this.repertoire = this._repertoireListService.getRepertoire(dayNumber);
  }
}
