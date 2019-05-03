import {Component, OnInit} from '@angular/core';
import {NavbarApiService} from './services/navbar-api.service';
import {PriceListApiModel} from './models/api-models/price-list-api.model';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public priceList: PriceListApiModel;
  public isMobile: boolean;

  constructor(private _navbarService: NavbarApiService,
              private _deviceService: DeviceDetectorService) {
  }

  public ngOnInit(): void {
    this.priceList = this._navbarService.getPriceList();
    this.isMobile = this._deviceService.isMobile();
  }
}
