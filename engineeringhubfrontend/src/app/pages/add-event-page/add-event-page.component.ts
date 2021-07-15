import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

//https://newbedev.com/how-can-i-set-my-reactive-form-date-input-value

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {

  //formatDate(this.post.startDate, 'yyyy-MM-dd', 'en')

  groupEventForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    location: new FormControl("" ,Validators.required),
    "timestart-date": new FormControl("", Validators.required),
    "timeend-date": new FormControl("", Validators.required),
    "timestart-time": new FormControl("", Validators.required),
    "timeend-time": new FormControl("", Validators.required)
  });

  constructor() { }

  ngOnInit(): void {
  }

  createDate(date:string, time: string): Date {
    let dateString = date + " " + time;

    let parsedDate = moment(dateString, "YYYY-MM-DD hh:mm").toDate();

    return parsedDate;
  }

  async onSubmit(){

  }

}
