import {Injectable} from '@angular/core';
import {SharedServicesModule} from '../../shared-services.module';
import {MovieGender} from '../../../modules/movie/enums/movie-gender.enum';

@Injectable({
  providedIn: SharedServicesModule
})
export class TranslatorService {
  private _movieGenderTranslateMap: Map<MovieGender, string>;

  constructor() {
    this._initMovieGenderTranslateMap();
  }

  public translateMovieGender(movieGender: MovieGender): string {
    return this._movieGenderTranslateMap.get(movieGender);
  }

  private _initMovieGenderTranslateMap(): void {
    this._movieGenderTranslateMap = new Map<MovieGender, string>();

    this._movieGenderTranslateMap.set(MovieGender.Adventure, 'Przygodowy');
    this._movieGenderTranslateMap.set(MovieGender.Historical, 'Historyczny');
    this._movieGenderTranslateMap.set(MovieGender.Action, 'Akcji');
    this._movieGenderTranslateMap.set(MovieGender.Comedy, 'Komedia');
    this._movieGenderTranslateMap.set(MovieGender.Crime, 'Kryminalny');
    this._movieGenderTranslateMap.set(MovieGender.Drama, 'Dramat');
    this._movieGenderTranslateMap.set(MovieGender.Fantasy, 'Fantasy');
    this._movieGenderTranslateMap.set(MovieGender.HistoricalFiction, 'Fikcja historyczna');
    this._movieGenderTranslateMap.set(MovieGender.Horror, 'Horror');
    this._movieGenderTranslateMap.set(MovieGender.MagicalRrealism, 'Magiczny realizm');
    this._movieGenderTranslateMap.set(MovieGender.Mystery, 'Dreszczowiec');
    this._movieGenderTranslateMap.set(MovieGender.ParanoidFiction, 'Paranoid Fiction');
    this._movieGenderTranslateMap.set(MovieGender.Philosophical, 'Filozoficzny');
    this._movieGenderTranslateMap.set(MovieGender.Political, 'Polityczny');
    this._movieGenderTranslateMap.set(MovieGender.Romance, 'Romans');
    this._movieGenderTranslateMap.set(MovieGender.Saga, 'Saga');
    this._movieGenderTranslateMap.set(MovieGender.Satire, 'Satyra');
    this._movieGenderTranslateMap.set(MovieGender.ScienceFiction, 'Science Fiction');
    this._movieGenderTranslateMap.set(MovieGender.Social, 'Społeczny');
    this._movieGenderTranslateMap.set(MovieGender.Speculative, 'Spekulacyjny');
    this._movieGenderTranslateMap.set(MovieGender.Surreal, 'Surrealistyczny');
    this._movieGenderTranslateMap.set(MovieGender.Thriller, 'Thriller');
    this._movieGenderTranslateMap.set(MovieGender.Urban, 'Miejski');
    this._movieGenderTranslateMap.set(MovieGender.Western, 'Western');
  }
}
