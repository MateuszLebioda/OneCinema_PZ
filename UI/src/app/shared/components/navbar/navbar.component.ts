import {Component, OnInit} from '@angular/core';
import {NavbarService} from './services/navbar.service';
import {PriceListApiModel} from './api-models/price-list-api.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public priceList: PriceListApiModel;

  constructor(private _navbarService: NavbarService) {
  }

  public ngOnInit(): void {
    this.priceList = this._navbarService.getPriceList();
  }
}
