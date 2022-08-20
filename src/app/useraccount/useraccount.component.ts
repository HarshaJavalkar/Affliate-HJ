import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-useraccount',
  templateUrl: './useraccount.component.html',
  styleUrls: ['./useraccount.component.css'],
})
export class UseraccountComponent implements OnInit {
  status = false;
  adminName: string;

  constructor(private ar: ActivatedRoute, private router: Router) {}

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
