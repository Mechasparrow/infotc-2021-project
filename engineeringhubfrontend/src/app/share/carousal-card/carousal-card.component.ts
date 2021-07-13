import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'CarousalCard',
  templateUrl: './carousal-card.component.html',
  styleUrls: ['./carousal-card.component.scss']
})
export class CarousalCardComponent implements OnInit {

  @Input() item: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
