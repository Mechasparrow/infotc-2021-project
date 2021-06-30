import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'AttributeList',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {

  @Input() listName: string = "";
  @Input() attributeList: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
