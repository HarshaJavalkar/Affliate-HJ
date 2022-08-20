import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { boolean } from 'joi';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  username: any;
  logStatus: boolean;
  $subs: Subscription;

  status = false;
  adminName: string;

  constructor(
    private ds: DataService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.ar.paramMap.subscribe((data) => {
      this.adminName = data['param'];
    });
    this.$subs = this.ds.receiveloginState().subscribe((d) => {
      this.logStatus = d;
    });
  }

  login(){
    window.scrollTo(0, 0);
  }
  loginType() {
    if (sessionStorage.getItem('Usertype') == 'User') {
      return 1;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    this.$subs.unsubscribe();
  }

  redirect() {
    this.router.navigateByUrl('/home');
  }

  loggedin() {
    this.username = sessionStorage.getItem('username');

    return sessionStorage.getItem('token');
  }

  usertype() {
    const type = sessionStorage.getItem('Usertype');
    if (type == 'Admin') {
      return 0;
    }
    if (type == 'User') {
      return 1;
    } else {
      return 'logout';
    }
  }

  logOutUser() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('Usertype');
    this.logStatus = false;

    this.router.navigateByUrl('/home');
  }

  openNav() {
    document.getElementById('mySidenav').style.width = '250px';
  }

  closeNav() {
    document.getElementById('mySidenav').style.width = '0';
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
