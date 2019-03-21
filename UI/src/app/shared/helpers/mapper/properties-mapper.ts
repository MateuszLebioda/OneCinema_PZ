import {SeanceApiModel} from '../../../pages/repertoire/api-models/seance-api.model';
import {SeancesPerTimesOfDay} from '../../../pages/repertoire/models/seances-per-times-of-day';

export class PropertiesMapper {

  public static getSeancesPerTimesOfDay(source: SeanceApiModel[]): SeancesPerTimesOfDay {
    const destination: SeancesPerTimesOfDay = new SeancesPerTimesOfDay();

    for (const seance of source) {
      const minutesInDay = seance.start.getMinutes() + seance.start.getHours() * 60;

      if (minutesInDay <= 12 * 60) {
        destination.seancesUntilNoon.push(seance);
      } else if (minutesInDay <= 18 * 60) {
        destination.seancesAfternoon.push(seance);
      } else {
        destination.seancesEvening.push(seance);
      }
    }
    return destination;
  }
}
