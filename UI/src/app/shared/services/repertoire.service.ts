import {Injectable} from '@angular/core';
import {MovieProjectionViewModel} from '../view-models/movie-projection-view-model.model';
import {HttpClient} from '@angular/common/http';
import {HttpBaseService} from './http-base.service';
import {MovieProjection} from '../models/movie-projection.model';
import {SharedModule} from '../shared.module';

@Injectable({
  providedIn: SharedModule
})
export class RepertoireService extends HttpBaseService {

  constructor(private http: HttpClient) {
    super(http);
  }

  public getRepertoire(dayNumber: number): MovieProjectionViewModel[] {
    const repertoire = new Array<MovieProjectionViewModel>();

    repertoire.push({
      movieCategory: 'Akcji',
      movieDuration: 120,
      moviePosterUrl: 'https://static.pressfrom.info/upload/images/real/2019/03/14/fans-angry-danai-gurira-s-name-isn-t-atop-avengers-endgame-poster__701824_.jpg?content=1',
      movieTitle: 'Avengers',
      projectionType: '2D',
      seances: [
        {
          start: new Date('March 17, 2019 18:05:00'),
          finish: new Date('March 17, 2019 20:05:00'),
          id: '8823242'
        },
        {
          start: new Date('March 17, 2019 15:05:00'),
          finish: new Date('March 17, 2019 16:05:00'),
          id: '54543242'
        },
        {
          start: new Date('March 17, 2019 20:05:00'),
          finish: new Date('March 17, 2019 22:05:00'),
          id: '12223242'
        }
      ]
    });

    if (dayNumber === 2) {
      repertoire.push({
        movieCategory: 'Komedia', movieDuration: 150,
        moviePosterUrl: 'https://static.posters.cz/image/750/plakaty/kac-vegas-ii-plakat-i12276.jpg',
        movieTitle: 'Jaś fasola', projectionType: '3D',
        seances: [
          {
            start: new Date('March 17, 2019 11:05:00'),
            finish: new Date('March 17, 2019 15:05:00'),
            id: '32223242'
          },
        ]
      });
    }
    return repertoire;
  }

  public mapToMovieProjection(movieProjectionViewModel: MovieProjectionViewModel[]): MovieProjection[] {
    const result = new Array<MovieProjection>();

    for (const movie of movieProjectionViewModel) {
      const resultMovie = new MovieProjection();
      Object.assign(resultMovie, movie);

      for (const seance of movie.seances) {
        const minutesInDay = seance.start.getMinutes() + seance.start.getHours() * 60;

        if (minutesInDay <= 12 * 60) {
          resultMovie.seancesUntilNoon.push(seance);
        } else if (minutesInDay <= 18 * 60) {
          resultMovie.seancesAfternoon.push(seance);
        } else {
          resultMovie.seancesEvening.push(seance);
        }
      }

      result.push(resultMovie);
    }

    return result;
  }

  // private temp() {
  //   JSON.stringify(model); // zamienia na JSON
  // }
}
