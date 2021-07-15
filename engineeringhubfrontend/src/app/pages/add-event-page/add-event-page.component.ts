import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { formatDate } from '@angular/common';

//https://newbedev.com/how-can-i-set-my-reactive-form-date-input-value

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  createDate(date:string, time: string): Date {
    let dateString = date + " " + time;

    let parsedDate = moment(dateString, "YYYY-MM-DD hh:mm").toDate();

    return parsedDate;
  }

}
