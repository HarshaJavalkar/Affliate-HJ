import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { SpinnerService } from './spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}
