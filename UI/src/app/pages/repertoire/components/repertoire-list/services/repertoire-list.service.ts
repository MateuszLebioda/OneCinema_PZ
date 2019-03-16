import {Injectable} from '@angular/core';
import {MovieProjection} from '../../../../../shared/models/movie-projection.model';

@Injectable({
  providedIn: 'root'
})
export class RepertoireListService {

  constructor() {
  }

  public getRepertoire(dayNumber: number): MovieProjection[] {
    const repertoire = new Array<MovieProjection>();

    repertoire.push({movieCategory: 'Akcji', movieDuration: 120,
      moviePosterUrl: 'https://static.pressfrom.info/upload/images/real/2019/03/14/fans-angry-danai-gurira-s-name-isn-t-atop-avengers-endgame-poster__701824_.jpg?content=1', movieTitle: 'Avengers', projectionType: '2D',
      seances: [{start: new Date('15-05-2019')}]});

    if (dayNumber === 2) {
      repertoire.push({movieCategory: 'Komedia', movieDuration: 150,
        moviePosterUrl: 'https://static.posters.cz/image/750/plakaty/kac-vegas-ii-plakat-i12276.jpg',
        movieTitle: 'Jaś fasola', projectionType: '3D',
        seances: [{start: new Date('10-11-2020')}]});
    }

    return repertoire;
  }
}
