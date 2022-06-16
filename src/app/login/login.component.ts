import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  lists = ['User', 'Admin'];
  loginCheck: Boolean = false;
  isFormSubmitted = false;
  toastMessage: String = ' ';

  subscription: Subscription;
  loginObj;
  loginStatus: boolean = sessionStorage.getItem('username') ? true : false;

  constructor(
    private us: DataService,
    private router: Router,
    private toastr: ToastrService,
    private spinner: SpinnerService
  ) {}
  form;
  ngOnInit(): void {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),

      User: new FormControl(false),
      //  Admin:new FormControl(false),
    });
  }

  loginData() {
    this.loginObj = this.form.value;

    if (this.loginObj.User == null) {
      this.toastr.error('Please select Type of Login');
    } else {
      if (this.loginObj.User == 'User') {
        this.userLogin();
      }

      if (this.loginObj.User == 'Admin') {
        this.adminLogin();
      }
    }
  }

  userLogin() {
    // this.spinner.displayLoad(true);
    this.subscription = this.us.loginUser(this.loginObj).subscribe(
      (res) => {
        if (res['message'] == 'success') {
          this.toastr.success("Successfull logged In!'");
          sessionStorage.setItem('token', res['token']);
          this.loginStatus = true;
          sessionStorage.setItem('username', res['userObj']);
          sessionStorage.setItem('Usertype', this.loginObj.User);
          this.loginCheck = true;
          this.us.sendloginState(this.loginStatus);
          this.router.navigateByUrl(`/useraccount/${this.loginObj.username}`);
        }

        if (res['message'] == 'Invalid username') {
          this.toastr.error('Username is not valid Please Register');
        }
        if (res['message'] == 'Invalid Password') {
          this.toastr.error('Incorrect  Password');
        }
      },

      (err) => {
        this.spinner.displayLoad(false);
        this.toastr.error('Maintainance issue');
      }
    );
  }

  adminLogin() {
    this.us.loginAdmin(this.loginObj).subscribe(
      (res) => {
        if (res['message'] == 'success') {
          this.toastr.success('Login Success');
          sessionStorage.setItem("isAdminVerified",res.verifiedStatus);
          sessionStorage.setItem('token', res['token']);
          sessionStorage.setItem('username', res['adminObj']);
          sessionStorage.setItem('Usertype', this.loginObj.User);
          sessionStorage.setItem('admin_email', res['email'])
          this.loginStatus = true;
          this.us.sendloginState(this.loginStatus);
          this.router.navigateByUrl(`/adminaccount/${this.loginObj.username}`);
        }
        if (res['message'] == 'Invalid username') {
          this.toastr.error('Username is not valid Please Register');
        }
        if (res['message'] == 'Invalid Password') {
          this.toastr.error('Incorrect  Password');
        }


      },
      (err) => {}
    );
  }

  redirectRegister() {
    this.router.navigateByUrl('/register');
  }
}
