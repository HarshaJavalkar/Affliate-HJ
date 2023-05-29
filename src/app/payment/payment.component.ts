import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  constructor(
    private ds: DataService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  @ViewChild('closebutton') closebutton;

  total;
  x;
  str: any;
  deliveryCharge;
  sum;
  bool;
  otp: number;
  incorrectOtp = false;
  validity = false;
  savedCards: any;
  displayAddCard = true;
  cardLimitReached = false;
  cardDetails = [{ username: '', card: '', displayName: '' }];
  otpReceived = false;
  orders = [{ selectedAddress: '', orderBy: '', status: '' }];

  cardIndex = { index: '', username: '', cardObj: [] };

  cardSelected = false;
  selectedCardFromRadio: any;

  confirmed = true;
  // addAddress(ref) {
  //   console.log(ref.status);
  //   if (ref.status == 'VALID') {
  //     console.log(ref.value);
  //     this.validity = true;
  //    }

  //   else {
  //     this.validity = false;
  //   }
  // }

  selectedCard(card) {
    this.cardSelected = true;

    this.selectedCardFromRadio = this.cardSelected;
  }

  deleteCard(deletedIndex) {
    this.cardIndex.index = deletedIndex;
    this.cardIndex.username = sessionStorage.getItem('username');

    this.savedCards.splice(deletedIndex, 1);

    this.cardIndex.cardObj = this.savedCards;

    if (this.savedCards.length < 3) { this.displayAddCard = true; }

    this.ds.deleteCard(this.cardIndex).subscribe(
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
          if (res.message == 'Card deleted') {
            this.toastr.success(res.message);
          }
        }
      },
      (err) => {}
    );
  }

  makePayment() {
    const user = { username: sessionStorage.getItem('username') };

    // console.log(user)

    this.ds.makePaymentFinal(user).subscribe(
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
            this.otp = res.message;

            this.otpReceived = true;
            alert(this.otp);
          }
        }
      },
      (err) => {}
    );
  }
  confirmOtp(formOtp) {
    const user = { username: sessionStorage.getItem('username') };

    const confirmOtps = formOtp.value.otp;

    if (this.otp == confirmOtps) {
      this.orders[0].status = 'success';
      this.orders[0].orderBy = sessionStorage.getItem('username');

      const receivedAddress = this.ds.receiveFinalAddress();
      this.orders[0].selectedAddress = receivedAddress;

      this.ds.makePaymentFinalStep(this.orders).subscribe(
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

          // orders list  of user
          // admin profile sales
        },
        (err) => {}
      );

      this.router.navigateByUrl('thanks');
    } else {
      this.orders[0].status = 'failed';
      this.orders[0].orderBy = sessionStorage.getItem('username');

      this.incorrectOtp = true;
    }
  }
  cardSave(ref) {
    const cardObj = ref.value;
    // console.log(cardObj)
    this.closebutton.nativeElement.click();
    const user = sessionStorage.getItem('username');

    this.cardDetails[0].username = user;
    this.cardDetails[0].card = cardObj;

    const str = cardObj.cHname + '-' + (parseInt(cardObj.cNumber) % 10000);

    this.cardDetails[0].displayName = str;

    this.ds.cardSave(this.cardDetails).subscribe(
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
          if (res.message == 'Card Added') {
            this.cardLimitReached = false;
            this.x = 'modal';

            // this.router.navigateByUrl('/home')
            this.savedCards.push(this.cardDetails[0]);
            //  console.log( this.savedCards.length)

            if (this.savedCards.length >= 3) { this.displayAddCard = false; }
          } else {
            this.cardLimitReached = true;
          }
        }
      },
      (err) => {}
    );
  }

  ngOnInit(): void {
    const user = sessionStorage.getItem('username');

    this.cardDetails[0].username = user;

    this.ds.getCards(this.cardDetails).subscribe(
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
          this.savedCards = res.message;

          if (this.savedCards.length <= 2) {
            this.displayAddCard = true;
          } else {
            this.displayAddCard = false;
          }
        }
      },
      (err) => {}
    );
  }
}
