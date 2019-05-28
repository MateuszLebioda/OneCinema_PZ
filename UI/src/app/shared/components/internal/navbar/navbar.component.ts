import {Component, OnInit} from '@angular/core';
import {PriceListApiModel} from './models/api-models/price-list-api.model';
import {DeviceDetectorService} from 'ngx-device-detector';
import {NavbarApiService} from './services/navbar-api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public get priceList(): PriceListApiModel {
    return this._priceList;
  }

  public isMobile: boolean;

  private _priceList: PriceListApiModel = new PriceListApiModel();

  constructor(private _apiService: NavbarApiService,
              private _deviceService: DeviceDetectorService) {
  }

  public ngOnInit(): void {
    this._apiService.getPriceList().subscribe(priceList => {
      this._priceList = priceList;
    });
    this.isMobile = this._deviceService.isMobile();
  }
}
