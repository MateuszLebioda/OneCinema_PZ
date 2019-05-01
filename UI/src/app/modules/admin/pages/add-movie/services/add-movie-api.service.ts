import {Injectable} from '@angular/core';
import {AdminServicesModule} from '../../../admin-services.module';
import {AddMovieRequestModel} from '../components/seance/models/requests/add-movie-request.model';

@Injectable({
  providedIn: AdminServicesModule
})
export class AddMovieApiService {

  constructor() {
  }

  public addMovie(request: AddMovieRequestModel): void {
    console.log('addMovie request', request);
  }
}
