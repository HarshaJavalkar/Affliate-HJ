import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent implements OnInit {
  userprofile;
  userObj = { username: '' };
  subscription: Subscription;
  username;

  constructor(
    private ar: ActivatedRoute,
    private ds: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.username = sessionStorage.getItem('username');

    this.userObj.username = sessionStorage.getItem('username');

    this.subscription = this.ds.getprofile(this.userObj).subscribe(
      (res) => {
        this.userprofile = res.message;
      },
      (err) => {}
    );

    // this.subscription=this.ar.paramMap.subscribe(

    //   data=>
    //   {
    //     this.username=data['params'].username

    //     console.log(this.username)

    //   })
  }

  changePassword(userpass) {
    const changepassObj = userpass.value;
    changepassObj.username = sessionStorage.getItem('username');
    console.log('pass', changepassObj);

    this.ds.changepassword(changepassObj).subscribe(
      (res) => {
        if (
          res.message == 'Session is Expired.. Please relogin to continue'
        ) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          alert('Session Expired Please relogin');
        }
        if (res.message == 'Unauthorized access') {
          alert(res.message);
        }

        if (res.message == 'Password Not matched') {
          alert(res.message);
        } else {
          alert(res.message);
        }
      },
      (err) => {}
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
