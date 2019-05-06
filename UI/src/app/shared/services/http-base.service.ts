import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {HttpOptions} from '../configurations/http-options';
import {SharedServicesModule} from '../shared-services.module';

@Injectable({
  providedIn: SharedServicesModule
})
export abstract class HttpBaseService {
  private readonly baseUrl = 'bazowy url/';
  private readonly _httpOptions: HttpOptions;

  protected constructor(private _http: HttpClient) {
    this._httpOptions = new HttpOptions();
  }

  public get<T>(url: string): Observable<T> {
    return this._http.get<T>(this.getRealUrl(url), this._httpOptions);
  }

  public post<T>(url: string, model: any): Observable<T> {
    return this._http.post<T>(this.getRealUrl(url), model, this._httpOptions);
  }

  public delete<T>(url: string): Observable<T> {
    return this._http.delete<T>(this.getRealUrl(url), this._httpOptions);
  }

  public getRealUrl(url: string): string {
    return `${this.baseUrl}${this.baseUrl}`;
  }

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
