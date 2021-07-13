import { InvokeMethodExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';

import * as faker from 'faker';

@Component({
  selector: 'CardCarousal',
  templateUrl: './card-carousal.component.html',
  styleUrls: ['./card-carousal.component.scss']
})
export class CardCarousalComponent implements OnInit {

  pageIdx: number = 0;
  items: any[] = [];
  items_per_page: number = 3;
  pages: number = 0;
  currentPage: number = 1;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        title: faker.company.bsAdjective() + " " + faker.company.bsNoun(),
        description: faker.lorem.paragraph()
      },
      {
        title: faker.company.bsAdjective() + " " + faker.company.bsNoun(),
        description: faker.lorem.paragraph()
      },
      {
        title: faker.company.bsAdjective() + " " + faker.company.bsNoun(),
        description: faker.lorem.paragraph()
      },
      {
        title: faker.company.bsAdjective() + " " + faker.company.bsNoun(),
        description: faker.lorem.paragraph()
      },
      {
        title: faker.company.bsAdjective() + " " + faker.company.bsNoun(),
        description: faker.lorem.paragraph()
      },
      {
        title: faker.company.bsAdjective() + " " + faker.company.bsNoun(),
        description: faker.lorem.paragraph()
      },
    ];

    this.calculatePages();
  }

  calculatePages(){
    this.pages = Math.ceil(this.items.length / this.items_per_page);
  }

  getCurrentPage(): any[] {
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
