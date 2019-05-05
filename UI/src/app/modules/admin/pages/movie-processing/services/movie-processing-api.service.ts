import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../admin-services.module';
import {MovieProcessingRequestModel} from '../models/requests/movie-processing-request.model';
import {MovieProcessingApiModel} from '../models/api/movie-processing-api.model';
import {MovieGender} from '../../../../movie/enums/movie-gender.enum';
import {WeekDays} from '../components/seance/enums/week-days.enum';
import {ProjectionType} from '../../../../movie/enums/projection-type.enum';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieProcessingApiService {

  constructor() {
  }

  public addMovie(request: MovieProcessingRequestModel): void {
    request.id = null;
    console.log('addMovie request', request);
  }

  public updateMovie(request: MovieProcessingRequestModel): void {
    console.log('updateMovie request', request);
  }

  public getMovie(movieId: string): MovieProcessingApiModel {
    return {
      id: 'efhfqhowfiehofw',
      duration: 120,
      genders: [MovieGender.Thriller, MovieGender.Speculative],
      posterUrl: 'https://www.vintagemovieposters.co.uk/wp-content/uploads/2018/04/IMG_3059-482x714.jpg',
      trailerUrl: 'https://www.youtube.com/embed/TcMBFSGVi1c',
      rating: 4.5,
      title: 'Avengers',
      screeningRooms: [
        {
          id: 'sfdsfffasdsdfa',
          weeks: [
            {
              weekNumber: 1,
              days: [
                {
                  day: WeekDays.Friday,
                  seancesTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Sunday,
                  seancesTimes: [
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
              weekNumber: 2,
              days: [
                {
                  day: WeekDays.Monday,
                  seancesTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Thursday,
                  seancesTimes: [
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
          id: 'qwqqwewqqew',
          weeks: [
            {
              weekNumber: 1,
              days: [
                {
                  day: WeekDays.Monday,
                  seancesTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Tuesday,
                  seancesTimes: [
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
              weekNumber: 2,
              days: [
                {
                  day: WeekDays.Wednesday,
                  seancesTimes: [
                    {
                      projectionType: ProjectionType.type2D,
                      start: new Date(),
                      end: new Date()
                    }
                  ]
                },
                {
                  day: WeekDays.Thursday,
                  seancesTimes: [
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
