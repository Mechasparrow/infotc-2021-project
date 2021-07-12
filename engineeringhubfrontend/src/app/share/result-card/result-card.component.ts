import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum CardType {
  ProjectView,
  ProjectProposalView,
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


  @Input() extraMetaData: any = {};

  @Input() genericName:string = "";

  @Output() viewCardEvent: EventEmitter<any> = new EventEmitter<any>();


  constructor() { }

  ngOnInit(): void {
  
  }

  cardToDisplayString(): string {
    switch (this.cardType){
      case CardType.ProjectView:
        return 'project';
      case CardType.ProjectProposalView:
        return 'project proposal';
      case CardType.GroupView:
        return 'group';
      case CardType.UserView:
        return 'user';
      default:
        return '';
    }
  }

  viewCard(): void {
    this.viewCardEvent.emit(this.extraMetaData);
  }

  
}

