import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { Project } from 'src/app/models/Project';
import { ProjectProposal } from 'src/app/models/ProjectProposal';
import { User } from 'src/app/models/User';

export interface MappedItem{
  title: string,
  description: string
}

export interface ItemMapper {
  (item: any): MappedItem
}


@Component({
  selector: 'CarousalCard',
  templateUrl: './carousal-card.component.html',
  styleUrls: ['./carousal-card.component.scss']
})
export class CarousalCardComponent implements OnInit {

  @Input() item: any = {};
  @Input() itemType: string = "";
  @Output() carousalItemSelected: EventEmitter<any> = new EventEmitter<any>();

  mapToItem: ItemMapper = this.nullMapper;

  constructor() { }

  ngOnInit(): void {
    if (this.itemType == "user"){
      this.mapToItem = this.mapUserToItem;
    }else if (this.itemType == "project"){
      this.mapToItem = this.mapProjectToItem;
    }else if (this.itemType == "group"){
      this.mapToItem = this.mapGroupToItem;
    }else if (this.itemType == "project-proposal"){
      this.mapToItem = this.mapProposalToItem;
    }
  }

  cardClick(){
    this.carousalItemSelected.emit(this.item);
  }

  nullMapper(item:any){
    return <MappedItem>{};
  }

  mapUserToItem(item: User){
    return <MappedItem>{
      title: item.username
    }
  }

  mapProjectToItem(item: Project){
    return <MappedItem>{
      title: item.name,
      description: item.description
    }
  }

  mapGroupToItem(item: Group){
    return <MappedItem>{
      title: item.name,
      description: item.description
    }
  }

  mapProposalToItem(item: ProjectProposal){
    return <MappedItem>{
      title: item.name,
      description: item.description
    }
  }

}
