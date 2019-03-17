import {Injectable} from '@angular/core';
import {MovieProjectionViewModel} from '../../../../../shared/view-models/movie-projection-view-model.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {HttpBaseService} from '../../../../../shared/services/http-base.service';
import {MovieProjection} from '../../../../../shared/models/movie-projection.model';
import {forEach} from '@angular/router/src/utils/collection';

@Injectable({
  providedIn: 'root'
})
export class RepertoireListService extends HttpBaseService {

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
        new Date(1995, 11, 17, 11, 24, 0),
        new Date(1995, 11, 17, 9, 14, 0)
      ]
    });

    if (dayNumber === 2) {
      repertoire.push({
        movieCategory: 'Komedia', movieDuration: 150,
        moviePosterUrl: 'https://static.posters.cz/image/750/plakaty/kac-vegas-ii-plakat-i12276.jpg',
        movieTitle: 'Jaś fasola', projectionType: '3D',
        seances: [new Date(1995, 11, 17, 18, 22, 44)]
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
        const minutesInDay = seance.getMinutes() + seance.getHours() * 60;

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
