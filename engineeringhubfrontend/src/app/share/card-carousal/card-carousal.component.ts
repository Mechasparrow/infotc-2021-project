import { InvokeMethodExpr } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

import * as faker from 'faker';

@Component({
  selector: 'CardCarousal',
  templateUrl: './card-carousal.component.html',
  styleUrls: ['./card-carousal.component.scss']
})
export class CardCarousalComponent implements OnInit {


  @Input() items: any[] | null = [];

  pageIdx: number = 0;
  items_per_page: number = 3;
  pages: number = 0;
  currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.calculatePages();
  }

  calculatePages(){
    this.pages = (this.items != null) ? Math.ceil(this.items.length / this.items_per_page) : 0;
  }

  getCurrentPage(): any[] {
    if (this.items == null){
      return [];
    }

    let minIndex: number = this.pageIdx * this.items_per_page;
    let maxIndex: number = minIndex + (this.items_per_page - 1);

    let arr: any[] =  this.items.filter((item, index) => {
      return index >= minIndex && index <= maxIndex;
    });

    if (arr.length < this.items_per_page){
      for (var i = 0; i < this.items_per_page - arr.length + 1; i++){
        arr.push({});
      }
    }


    return arr;
  }

  pageLeft() {
    if (this.pageIdx > 0){
      this.pageIdx -= 1;
    }
  }

  pageRight() {
    if (this.pageIdx < (this.pages - 1))
    this.pageIdx += 1;
  }
}
