import {AfterViewInit, Component, OnInit} from '@angular/core';

declare function showSlideBanner(): void;

@Component({
  selector: 'app-slide-banner',
  templateUrl: './slide-banner.component.html',
  styleUrls: ['./slide-banner.component.css']
})
export class SlideBannerComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  public ngAfterViewInit(): void {
    showSlideBanner();
  }
}
