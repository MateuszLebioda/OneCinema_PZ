import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RepertoireDaysService {
  private readonly _maxCountOfPresentedRepertoireDays = 8;
  private readonly _weekDays = [
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela',
    'Poniedziałek',
    'Wtorek',
    'Środa',
    'Czwartek',
    'Piątek',
    'Sobota',
    'Niedziela'
  ];

  public getRepertoireDaysSinceNow(): string[] {
    const currentDayNumber = new Date().getDay() - 1;
    const result = new Array<string>();

    for (let dayIndex = currentDayNumber; dayIndex < this._maxCountOfPresentedRepertoireDays; dayIndex++) {
      result.push(this._weekDays[dayIndex]);
    }
    return result;
  }
}
