import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { required } from 'joi';
import { SpinnerService } from '../spinner.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css'],
})
export class StoreComponent implements OnInit {
  subscription: Subscription;
  clickedCard: number;
  constructor(
    private ar: ActivatedRoute,
    private ds: DataService,
    private toastr: ToastrService,
    private router: Router,
    private spinner: SpinnerService
  ) {}

  affliatesAvailable: Array<any>;
  booksUpdatedList = [];
  filteredBooks: Array<any>;

  title: string;

  prodinfo(bookId) {
    this.router.navigateByUrl(`productinfo/${bookId}`);
  }

  clickedCart(affliate) {
    const status = sessionStorage.getItem('username');

    if (status) {
      affliate.userAdded = status;

      //  console.log(affliate)

      this.ds.addtoCart(affliate).subscribe(
        (res) => {
          if (res.message == 'product added to cart') {
            this.toastr.success('product added successfully');
          } else {
            this.toastr.success('Product is  already exist in cart');
          }
        },

        (err) => {}
      );
    } else {
      alert('Please Register ');
    }
  }

  // wishlist

  clickedWishlist(affliate) {
    const status = sessionStorage.getItem('username');

    if (status) {
      affliate.userAdded = status;

      //  console.log(affliate)

      this.ds.moveToWishlistFromStore(affliate).subscribe(
        (res) => {
          // console.log(res['message']);

          if (res.message == 'product added to wishlist') {
            this.toastr.success('product added to WishList');
          } else {
            this.toastr.error('Product is  already exist in wishlist');
          }
        },

        (err) => {}
      );
    } else {
      alert('Please Login or Register ');
    }
  }

  // wishlist end

  ngOnInit(): void {
    this.spinner.displayLoad(true);
    this.ar.paramMap.subscribe((data) => {
      this.clickedCard = data['params'].id;
      // this.spinner.displayLoad(false);
    });

    this.clickedCard = +this.clickedCard;
    this.ds.getAllaffliateProductstoUsers().subscribe(
      (res) => {
        this.affliatesAvailable = res.message;
        // console.log('checkpoint-1', this.affliatesAvailable);

        // this.booksUpdatedList.length=this.affliatesAvailable.length;

        for (let i = 0; i < this.affliatesAvailable.length; i++) {
          if (this.affliatesAvailable[i].active) {
            this.booksUpdatedList.push(this.affliatesAvailable[i]);
          }
        }

        // console.log('checkpoint-2', this.booksUpdatedList);

        this.booksUpdatedList = this.affliatesAvailable.filter(function(el) {
          return el != null;
        });
        // console.log("last",this.booksUpdatedList)

        switch (this.clickedCard) {
          case 1: {
            this.filteredBooks = this.affliatesAvailable.filter((affliate) => {
              return affliate.type == 'Mobiles & Electronics';
            });

            break;
          }

          case 2: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Home Appliances';
            });
            break;
          }

          case 3: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Beauty Products';
            });

            break;
          }

          case 4: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Clothes';
            });

            break;
          }

          case 5: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Tools';
            });

            break;
          }

          case 6: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Branded Items';
            });

            break;
          }

          case 7: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Laptop';
            });

            break;
          }

          case 8: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'TVs';
            });

            break;
          }

          case 9: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Children';
            });

            break;
          }

          case 10: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Science';
            });

            break;
          }

          case 11: {
            this.filteredBooks = this.booksUpdatedList.filter((affliate) => {
              return affliate.type == 'Fiction';
            });

            break;
          }
        }
        this.spinner.displayLoad(false);
      },

      (err) => {}
    );
  }
}
