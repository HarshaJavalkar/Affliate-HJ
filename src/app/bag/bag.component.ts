import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css'],
})
export class BagComponent implements OnInit {
  user = { username: '' };
  cart: any;
  inStock = [];
  bool;
  total;
  checkCart = false;
  deletedProducts = [];
  activeProducts = [];
  sum = 0;
  totalPrice: number;
  cartIsEmpty: boolean;
  limitofPurhcase = false;
  indexRemoved;

  deliveryCharge = 50;
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  placeOrder() {
    this.router.navigateByUrl(`useraccount/${this.user.username}/cart/address`);
  }

  removeItemfromCart(item) {
    this.ds.removeFromCart(item).subscribe(
      (res) => {
        if (
          res.message == 'Session is Expired.. Please relogin to continue'
        ) {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('Usertype');
          this.router.navigateByUrl('/login');
          this.toastr.error('Session Expired Please relogin');
        }
        if (res.message == 'Unauthorized access') {
          alert(res.message);
        } else {
          for (let i = 0; i < this.activeProducts.length; i++) {
            if (item.prod_id == this.activeProducts[i].prod_id) {
              this.indexRemoved = i;
            }
          }

          this.activeProducts.splice(this.indexRemoved, 1);
          if (this.activeProducts.length == 0) { this.cartIsEmpty = false; }
        }
      },
      (err) => {}
    );
  }

  //  move to wish list
  wish(book) {
    this.removeItemfromCart(book);

    const status = sessionStorage.getItem('username');

    if (status) {
      book.userAdded = status;

      //  console.log(book)

      this.ds.moveToWishlistFromStore(book).subscribe(
        (res) => {
          console.log(res.message);

          if (res.message == 'product added to wishlist') {
            this.toastr.success('product added to WishList');
          } else {
            this.toastr.warning('Product is  already exist in wishlist');
          }
        },

        (err) => {}
      );
    } else {
      alert('Please Login or Register ');
    }
  }

  ngOnInit(): void {
    this.user.username = sessionStorage.getItem('username');

    this.ds.getCart(this.user).subscribe(
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
        } else {
          this.cart = res.message;

          for (let i = 0; i < this.cart.length; i++) {
            if (this.cart[i].active) { this.inStock[i] = this.cart[i]; }
          }

          if (this.cart.length == 0) {
            this.cartIsEmpty = false;
          } else {
            this.cartIsEmpty = true;
          }

          for (let i = 0; i < this.cart.length; i++) {
            this.sum = Math.round(this.sum + this.cart[i].prod_price + 1);
          }

          if (this.sum > 1000) {
            this.bool = true;

            this.total = this.sum;
          } else {
            this.bool = false;
            this.total = this.sum + this.deliveryCharge;
          }
        }
      },

      (err) => {}
    );

    setTimeout(() => {
      /*Your Code*/

      this.ds.checkDelete(this.cart).subscribe(
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
          } else {
            const boolean = res.message;

            for (let k = 0, i = 0; k < boolean.length; i++, k++) {
              if (boolean[k] == 'true') {
                this.activeProducts.push(this.cart[i]);
              } else {
                this.deletedProducts.push(this.cart[i]);

                this.checkCart = true;
              }
            }
          }

          // console.log(this.checkCart)
        },
        (err) => {}
      );
    }, 1100);
  }
}
