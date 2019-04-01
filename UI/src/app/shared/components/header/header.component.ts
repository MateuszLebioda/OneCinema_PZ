import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cinemPhoneNumber: string;

  constructor() {
  }

  public ngOnInit(): void {
    this.cinemPhoneNumber = '(+000) 123 345 653';
  }
}
