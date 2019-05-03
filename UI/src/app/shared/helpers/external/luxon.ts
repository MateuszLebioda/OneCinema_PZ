import * as _ from 'luxon';
import {DateTime} from 'luxon';

export class Luxon {
  public static utils = _;

  public static toDateTime(date: Date): DateTime {
    return Luxon.utils.DateTime.fromMillis(date.getTime());
  }

  public static toDate(date: DateTime): Date {
    return new Date(date.toISO());
  }
}
