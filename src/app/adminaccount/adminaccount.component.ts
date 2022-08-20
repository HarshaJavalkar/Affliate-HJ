import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-adminaccount',
  templateUrl: './adminaccount.component.html',
  styleUrls: ['./adminaccount.component.css'],
})
export class AdminaccountComponent implements OnInit {
  status = false;
  adminName: string;

  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private ds: DataService
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.adminName = data['param'];
    });
  }

  toggleMenu() {
    this.status = !this.status;
  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    this.router.navigateByUrl('/login');
  }
}
