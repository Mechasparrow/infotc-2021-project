import { Component, Input, OnInit } from '@angular/core';

export enum CardType {
  ProjectView,
  GroupView,
  UserView
}

@Component({
  selector: 'ResultCard',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss']
})

export class ResultCardComponent implements OnInit {
  @Input() cardType: CardType = CardType.ProjectView;

  @Input() projectName:string = "";
  @Input() projectDescription: string = "";
  @Input() projectAttributes: string[] = [];

  @Input() genericName:string = "";


  constructor() { }

  ngOnInit(): void {
  
  }

  cardToDisplayString(): string {
    switch (this.cardType){
      case CardType.ProjectView:
        return 'project';
      case CardType.GroupView:
        return 'group';
      case CardType.UserView:
        return 'user';
      default:
        return '';
    }
  }

}

