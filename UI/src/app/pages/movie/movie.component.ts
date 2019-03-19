import {AfterViewInit, Component, OnInit} from '@angular/core';

declare function showVideoPlayer(): void;

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, AfterViewInit {

  constructor() {
  }

  ngOnInit() {

  }

  public ngAfterViewInit(): void {
    showVideoPlayer();
  }

}
