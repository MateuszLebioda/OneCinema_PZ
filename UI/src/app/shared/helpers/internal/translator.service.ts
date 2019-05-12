import {Injectable} from '@angular/core';
import {SharedServicesModule} from '../../shared-services.module';

@Injectable({
  providedIn: SharedServicesModule
})
export class TranslatorService {
  private _movieGenderTranslateMap: Map<string, string>;

  constructor() {
    this._initMovieGenderTranslateMap();
  }

  public translateMovieGender(movieGender: string): string {
    return this._movieGenderTranslateMap.get(movieGender);
  }

  private _initMovieGenderTranslateMap(): void {
    this._movieGenderTranslateMap = new Map<string, string>();

    this._movieGenderTranslateMap.set('Adventure', 'Przygodowy');
    this._movieGenderTranslateMap.set('Historical', 'Historyczny');
    this._movieGenderTranslateMap.set('Action', 'Akcji');
    this._movieGenderTranslateMap.set('Comedy', 'Komedia');
    this._movieGenderTranslateMap.set('Crime', 'Kryminalny');
    this._movieGenderTranslateMap.set('Drama', 'Dramat');
    this._movieGenderTranslateMap.set('Fantasy', 'Fantasy');
    this._movieGenderTranslateMap.set('HistoricalFiction', 'Fikcja historyczna');
    this._movieGenderTranslateMap.set('Horror', 'Horror');
    this._movieGenderTranslateMap.set('MagicalRrealism', 'Magiczny realizm');
    this._movieGenderTranslateMap.set('Mystery', 'Dreszczowiec');
    this._movieGenderTranslateMap.set('ParanoidFiction', 'Paranoid Fiction');
    this._movieGenderTranslateMap.set('Philosophical', 'Filozoficzny');
    this._movieGenderTranslateMap.set('Political', 'Polityczny');
    this._movieGenderTranslateMap.set('Romance', 'Romans');
    this._movieGenderTranslateMap.set('Saga', 'Saga');
    this._movieGenderTranslateMap.set('Satire', 'Satyra');
    this._movieGenderTranslateMap.set('ScienceFiction', 'Science Fiction');
    this._movieGenderTranslateMap.set('Social', 'Społeczny');
    this._movieGenderTranslateMap.set('Speculative', 'Spekulacyjny');
    this._movieGenderTranslateMap.set('Surreal', 'Surrealistyczny');
    this._movieGenderTranslateMap.set('Thriller', 'Thriller');
    this._movieGenderTranslateMap.set('Urban', 'Miejski');
    this._movieGenderTranslateMap.set('Western', 'Western');
  }
}
