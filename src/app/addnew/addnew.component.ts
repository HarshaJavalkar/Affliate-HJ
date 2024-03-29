import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
declare var $: any;

@Component({
  selector: 'app-addnew',
  templateUrl: './addnew.component.html',
  styleUrls: ['./addnew.component.css'],
})
export class AddnewComponent implements OnInit {

  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  file: File;
  username: string;
  sendData;
  toastMessage: string;

  typeArray: Array<String>;
  typeLanguage: Array<String>;

  // form data used to hold multimedia content
  formData = new FormData();

  validity = false;

  dataArray: Array<any>;

  addimage(event) {
    this.file = event.target.files[0];
  }

  ngOnInit(): void {
    // this.typeArray = [
    //   'Adventure',
    //   'Biography',
    //   'Business',
    //   'Computing',
    //   'Crime',
    //   'Fiction',
    //   'Humour',
    //   'Politics',
    //   'Literature',
    //   'Romance',
    //   'Science',
    // ];

    this.typeArray = [
      'Mobiles & Electronics',
      'Home Appliances',
      'Tools',
      'Beauty Products',
      'Clothes',
      'Other Products',
      'Children',
      'Laptop',
      'TVs',
    ];

    this.typeLanguage = ['English', 'Hindi'];
  }

  addProd(ref) {
    console.log(ref.status);
    if (ref.status == 'VALID') {
      const localData = sessionStorage.getItem('username');

      ref.value.active = true;

      ref.value.creator = localData;
      this.dataArray = ref.value;
      console.log('sent data', this.dataArray);
      const productObj = ref.value;

      this.formData.append('photo', this.file, this.file.name);
      this.formData.append('productObj', JSON.stringify(productObj));

      this.ds.createProduct(this.formData).subscribe(
        (res) => {
          if (res.message == 'Product created successfully') {
            this.toastr.success('New Book added successfully');
            ref.resetForm();
          }
          // this.router.navigateByUrl}(`/adminaccount/${localData}`)

          if (res.message == 'Product already exist') {
            this.toastMessage = res.message;
            this.toastr.warning(res.message);

            ref.resetForm();
          }
        },
        (err) => {
          this.toastMessage = 'Something went wrong try after some time.';
        }
      );

      this.validity = false;
    } else {
      this.toastMessage = 'Please fill all the details';

      this.validity = true;
    }
  }
  addAffliate(ref) {
    console.log(ref.status);
    if (ref.status == 'VALID') {
      const localData = sessionStorage.getItem('username');
      ref.value.active = true;
      ref.value.creator = localData;
      this.dataArray = ref.value;
      console.log('sent data', this.dataArray);
      const productObj = ref.value;

      this.formData.append('photo', this.file, this.file.name);
      this.formData.append('productObj', JSON.stringify(productObj));

      this.ds.createAffliate(this.formData).subscribe(
        (res) => {
          if (res.message == 'Affliate created successfully') {
            this.toastr.success('New Affliate added successfully');
            ref.resetForm();
          }
          // this.router.navigateByUrl}(`/adminaccount/${localData}`)
          if (res.message == 'Affliate already exist') {
            this.toastMessage = res.message;
            this.toastr.warning(res.message);
            ref.resetForm();
          }
        },
        (err) => {
          this.toastMessage = 'server is down contact Harsha';
        }
      );
      this.validity = false;
    } else {
      this.toastMessage = 'Please fill all the details';
      this.validity = true;
    }
  }
}
