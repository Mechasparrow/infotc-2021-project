import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'AttributeList',
  templateUrl: './attribute-list.component.html',
  styleUrls: ['./attribute-list.component.scss']
})
export class AttributeListComponent implements OnInit {

  @Input() editable: boolean = false;
  @Input() hasHeader: boolean = true;
  @Input() listName: string = "";
  @Input() attributeList: string[] = [];

  @Output() attributedAdded: EventEmitter<string> = new EventEmitter<string>();

  editting:boolean = false;
  newAttribute: FormControl = new FormControl("");

  constructor() { }

  ngOnInit(): void {

  }

  onEdit(): void {
    this.editting = true;
  }

  onSubmit(){
    let createdAttribute = this.newAttribute.value;

    //TODO Emit event back to the Profile page component
    this.attributedAdded.emit(createdAttribute);

    //Stop editting
    this.editting = false;
    this.newAttribute.setValue("");
  }

}
