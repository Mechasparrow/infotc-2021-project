import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

}
