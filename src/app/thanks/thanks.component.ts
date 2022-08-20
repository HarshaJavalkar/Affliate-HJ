import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { string } from 'joi';
import { DataService } from '../data.service';

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css'],
})
export class ThanksComponent implements OnInit {
  constructor(private router: Router, private ds: DataService) {}
  receivedAddress: string;

  username = sessionStorage.getItem('username');

  ngOnInit(): void {}

  backtoHome() {
    this.router.navigateByUrl(`/useraccount/${this.username}`);
  }
}
