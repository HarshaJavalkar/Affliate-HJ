import { Component, ElementRef, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  form: FormGroup;
  constructor(
    private elementRef: ElementRef,
    private formBuilder: FormBuilder,
    private Data: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    document.getElementById('trig-button').click();
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.pattern('.{6,6}')]],
    });
  }

  checkLength(event) {
    if (this.form.value.code >= 999999) {
      console.log(12);
    }
  }
  get formReturn() {
    return this.form.controls;
  }
  onSubmit() {
    const email = {
      email: sessionStorage.getItem('admin_email'),
      code: this.form.value.code,
    };
    this.Data.verifyRequestAdmin(email).subscribe((data) => {
      if (data.status == 200 && data.message == 'verified') {
        this.toastr.success('Profile verified successfully');
        this.router.navigateByUrl(
          `/adminaccount/${sessionStorage.getItem('username')}`
        );
      } else {
        document.getElementById('trig-button').click();
        this.toastr.error(data.message);
      }
    });
  }
}
