import {Injectable} from '@angular/core';
import {BannerMovie} from '../models/banner-movie';

@Injectable({
  providedIn: 'root'
})
export class BannerApiService {

  constructor() {
  }

  public getMovies(): BannerMovie[] {
    const result = new Array<BannerMovie>();
    result.push({
      id: 'sdjdsjsd',
      description: 'Szpady Przynajmniéj cenić śmiertelnego dojeżdżaczy przysunąwszy Waść uczuł szlacheckiemi damach. Prorok żmija skroni usieść świecie niechcę zmówił żadnego długa. Dać dnie skrzydliki jaki maja daje krwi śniadania inna mimowolnie lity. Jakoż królowej zamęczą czynownik mojéj nareszcie słowo ogień jednej swoich miesiąca ż',
      posterUrl: 'https://www.washingtonpost.com/graphics/2019/entertainment/oscar-nominees-movie-poster-design/img/black-panther-web.jpg',
      title: 'Tytuł 1'
    });

    result.push({
      id: 'podrpropffd',
      description: 'Runi Zbyt Był Białopiotrowiczem tém inni był Wiec kozy. Ścigany znali Miłe własnym wieczora Wołają wiatr zwierzem sobie Stał Przed. Białopiotrowiczem widne dołu woła kiedy. Uroda ganku mowę danie przejrzystość ',
      posterUrl: 'https://media0ch-a.akamaihd.net/10/14/1707fa9400271dbe6431ee6deb8d2d69.jpg',
      title: 'Tytuł 2'
    });

    result.push({
      id: 'mcbvmcbwwr',
      description: 'Skóry dzieje kontusza Zrobiła gadać Spadała lokajów dworze widoki krzykną folwarku rekami. Panów posłuszni Napol',
      posterUrl: 'http://www.fubiz.net/wp-content/uploads/2016/02/mixedblockbusters-2-900x1273.jpg',
      title: 'Tytuł 3'
    });

    result.push({
      id: 'qasueefvvd',
      description: 'Puste gospodarskiéj mowę chcę wiele trzej jedna wykli barbarzyństwa opoka prapradziadów. Zakryła dążył nosy Zaś jaki Jest trzy Przy Wiec myślami pływać konikach majowéj ryby. Najpiękniejszego izba Rzeczypospolitéj s',
      posterUrl: 'https://dl9fvu4r30qs1.cloudfront.net/46/bc/85b27c604bbf9579d36ab4a1e023/macbeth-poster.jpg',
      title: 'Tytuł 4'
    });

    result.push({
      id: 'mzxncbvv',
      description: 'Różowemi chude kwestarzem Krzyknąć Bliskość łąk wnuki Soplicowem niech. Stryj najpiękniejszéj Rzeczypospolitéj nieba chowa Najpiękniejszego astry. Wykrzykników mię wnet Napełniając zajeżdżają temu nowo Dostatecz',
      posterUrl: 'https://mymodernmet.com/wp/wp-content/uploads/2018/01/honest-movie-posters-7.jpg',
      title: 'Tytuł 5'
    });

    result.push({
      id: 'sdjdsjsd',
      description: 'Piki Napoleonem kuca przyrzekł miłośnik owad noty. Zaś noga dnie Kusy Białopiotrowiczowi Już pniu. Lokaj blask rojem milczenie oboje znali śmiejąc chowa stada Szanowano posiekany czyje. Też pęk dano nosi Białopiotr',
      posterUrl: 'https://media0ch-a.akamaihd.net/33/78/9a295673c9ff94918d47cc565609b3ba.jpg',
      title: 'Tytuł 6'
    });

    return result;
  }
}
