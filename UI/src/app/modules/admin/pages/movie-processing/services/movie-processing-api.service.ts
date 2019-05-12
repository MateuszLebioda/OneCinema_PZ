import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../admin-services.module';
import {MovieProcessingRequestModel} from '../models/requests/movie-processing-request.model';
import {MovieProcessingApiModel} from '../models/api/movie-processing-api.model';
import {WeekDays} from '../components/seance/enums/week-days.enum';
import {ProjectionType} from '../../../../movie/enums/projection-type.enum';
import {Observable} from 'rxjs/internal/Observable';
import {HttpBaseService} from '../../../../../core/services/http-base.service';

@Injectable({
  providedIn: AdminServicesModule
})
export class MovieProcessingApiService {

  constructor(private _httpService: HttpBaseService) {
  }

  public addMovie(request: MovieProcessingRequestModel): Observable<any> {
    request.id = null;
    return this._httpService.post<any>('', request);
  }

  public updateMovie(request: MovieProcessingRequestModel): Observable<any> {
    return this._httpService.post<any>('', request);
  }

  public getMovie2(movieId: string): Observable<MovieProcessingApiModel> {
    return this._httpService.get<MovieProcessingApiModel>('');
  }

  public getMovie(movieId: string): MovieProcessingApiModel {
    return {
      id: 'efhfqhowfiehofw',
      duration: 120,
      genders: ['Thriller', 'Speculative'],
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
                  day: WeekDays.Monday,
                  seancesTimes: [
                    {
                      seanceId: 'id1',
                      projectionType: ProjectionType.type2D,
                      start: new Date('May 13, 2019 20:05:00'),
                      end: new Date('May 13, 2019 22:35:00')
                    }
                  ]
                },
                {
                  day: WeekDays.Friday,
                  seancesTimes: [
                    {
                      seanceId: 'zxc1',
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
                      seanceId: 'asd2',
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
                      seanceId: 'qwe3',
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
                      seanceId: 'vbn4',
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
                      seanceId: 'fgh5',
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
                      seanceId: 'plk7',
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
                      seanceId: 'pwh8',
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
                      seanceId: 'lzg9',
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

  public getGenders(): string[] {
    return [
      'Horror',
      'Adventure',
      'Drama',
      'Historical'
    ];
  }

  public getGenders2(): Observable<string[]> {
    return null;
  }
}
