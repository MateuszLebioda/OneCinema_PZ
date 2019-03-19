import { Injectable } from '@angular/core';
import {Movie} from '../../../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieSeancesService {

  constructor() { }

  public getMovie(): Movie {
    return {
      title: 'Avengers',
      category: 'Akcji, Kryminał',
      description: 'Opis przykłądowy',
      duration: 180,
      posterUrl: 'https://cdn.vox-cdn.com/thumbor/gFH7HEfO_Tczbfmnu57K8PB9k3Y=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/15962590/MLou2_Payoff_1_Sht_Online_DOM_v7_Sm_0.jpg',
      projectionType: '3D',
      rating: 4.5,
      seances: [
        {
          day: 0,
          seancesAfternoon: [{}]
        }
      ]
    }
  }
}
