import {Component, OnInit} from '@angular/core';
import {NavbarApiService} from './services/navbar-api.service';
import {PriceListApiModel} from './models/api-models/price-list-api.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public priceList: PriceListApiModel;

  constructor(private _navbarService: NavbarApiService) {
  }

  public ngOnInit(): void {
    this.priceList = this._navbarService.getPriceList();
  }
}
