import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../admin-services.module';
import {PreviewMovieApiModel} from '../models/api/preview-movie-api.model';
import {MovieGender} from '../../../../movie/enums/movie-gender.enum';
import {WeekDays} from '../../movie-processing/components/seance/enums/week-days.enum';
import {ProjectionType} from '../../../../movie/enums/projection-type.enum';

@Injectable({
  providedIn: AdminServicesModule
})
export class MoviePreviewApiService {

  constructor() {
  }

  public getMovie(): PreviewMovieApiModel {
    return {
      id: 'efhfqhowfiehofw',
      duration: 120,
      genders: [MovieGender.Thriller, MovieGender.Speculative],
      posterUrl: 'https://www.vintagemovieposters.co.uk/wp-content/uploads/2018/04/IMG_3059-482x714.jpg',
      trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
      rate: 4.5,
      title: 'Avengers',
      screeningRooms: [
        {
          name: 'Sala 1',
          id: 'sfdsfffasdsdfa',
          seances: [
            {
              weekRange: {
                start: new Date(),
                end: new Date()
              },
              days: [
                {
                  day: WeekDays.Friday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Sunday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type3D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                }
              ]
            },
            {
              weekRange: {
                start: new Date(),
                end: new Date()
              },
              days: [
                {
                  day: WeekDays.Monday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Thursday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type3D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          name: 'Sala 2',
          id: 'qwqqwewqqew',
          seances: [
            {
              weekRange: {
                start: new Date(),
                end: new Date()
              },
              days: [
                {
                  day: WeekDays.Monday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Tuesday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type3D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                }
              ]
            },
            {
              weekRange: {
                start: new Date(),
                end: new Date()
              },
              days: [
                {
                  day: WeekDays.Wednesday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Thursday,
                  projectionTimes: [
                    {
                      projectionType: ProjectionType.type3D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    };
  }
}
