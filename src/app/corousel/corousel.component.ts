import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { SpinnerService } from '../spinner.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-corousel',
  templateUrl: './corousel.component.html',
  styleUrls: ['./corousel.component.css'],
})
export class CorouselComponent implements OnInit {
  constructor(
    private router: Router,
    private spinner: SpinnerService,
    private data: DataService
  ) {}
  clickedExplore(cardClicked) {
    this.router.navigateByUrl(`/store/${cardClicked}`);
  }
  c_items = [];

  ngOnInit(): void {

     let username=sessionStorage.getItem('username')
    this.data.c_items(username).subscribe((res) => {
      this.c_items = res['message'];
    });
  }
}
