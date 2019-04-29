import {Injectable} from '@angular/core';
import {CinemaApiModel} from '../models/api/cinema-api.model';
import {CinemaServicesModule} from '../cinema-services.module';

@Injectable({
  providedIn: CinemaServicesModule
})
export class CinemaApiService {

  constructor() {
  }

  public getCinemaInfo(): CinemaApiModel {
    return {
      name: 'Fajne kino',
      addres: 'Dąbrowa górnicza ul. 11 Listopada 145',
      email: 'kino@kino.pl',
      numberOfcinemaHalls: 4,
      numberOfseats: 123,
      phoneNumber: '145 245 478',
      photoUrl: 'https://pik.wroclaw.pl/wp-content/uploads/2019/01/Kino-Cinema-City-Wroclavia-%E2%80%93-IMAX-Wroc%C5%82aw-4DX.jpg',
      description: 'Pellentesque vel urna accumsan, dictum sapien vitae, condimentum tellus. Nulla fermentum enim vitae\n' +
        '                  commodo dapibus. Vivamus diam ligula, accumsan non malesuada et, interdum malesuada turpis. Donec\n' +
        '                  posuere eros eget velit iaculis consequat. Vestibulum ante felis, congue a sapien pharetra, sodales\n' +
        '                  congue magna. Curabitur id varius urna. Morbi finibus, velit sagittis fermentum venenatis, erat risus\n' +
        '                  elementum nibh, at commodo lorem orci sed nulla. Pellentesque eu velit pulvinar, scelerisque lacus ut,\n' +
        '                  semper dolor.'
    };
  }
}
