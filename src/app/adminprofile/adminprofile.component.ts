import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.css'],
})
export class AdminprofileComponent implements OnInit {
  username: string;
  today = new Observable();
  constructor() {
    this.username = sessionStorage.getItem('username');
  }

  ngOnInit(): void {}
}
