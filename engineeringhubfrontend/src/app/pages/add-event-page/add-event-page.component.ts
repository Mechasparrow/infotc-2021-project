import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupEvent } from 'src/app/models/GroupEvent';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';
import { ApiService } from 'src/app/services/api/api.service';

//https://newbedev.com/how-can-i-set-my-reactive-form-date-input-value

@Component({
  selector: 'app-add-event-page',
  templateUrl: './add-event-page.component.html',
  styleUrls: ['./add-event-page.component.scss']
})
export class AddEventPageComponent implements OnInit {

  defaultDate: Date = new Date(Date.now());
  //formatDate(this.post.startDate, 'yyyy-MM-dd', 'en')

  editting: boolean = false;
  groupId: number = -1;
  groupEventForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    location: new FormControl("" ,Validators.required),
    "timestart-date": new FormControl(formatDate(this.defaultDate, 'yyyy-MM-dd', 'en'), Validators.required),
    "timeend-date": new FormControl(formatDate(this.defaultDate, 'yyyy-MM-dd', 'en'), Validators.required),
    "timestart-time": new FormControl(formatDate(this.defaultDate, 'hh:mm', 'en'), Validators.required),
    "timeend-time": new FormControl(formatDate(this.defaultDate, 'hh:mm', 'en'), Validators.required)
  });

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let groupIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.groupId = groupIdRaw != null ? parseInt(groupIdRaw) : -1;
  }


  createDate(date:string, time: string): Date {
    let dateString = date + " " + time;

    let parsedDate = moment(dateString, "YYYY-MM-DD hh:mm").toDate();

    return parsedDate;
  }

  async onSubmit(){
    let groupValues: any = this.groupEventForm.value;

    let startTime: Date = this.createDate(groupValues["timestart-date"], groupValues["timestart-time"]);
    let endTime: Date = this.createDate(groupValues["timeend-date"], groupValues["timeend-time"]);

    let newEvent: GroupEvent = <GroupEvent>{
      name: groupValues["name"],
      timeStart: startTime,
      timeEnd: endTime,
      description: groupValues["description"],
      location: groupValues["location"]
    }

    console.log(newEvent);
    let authToken = await this.tokenStore.getAuthenticationToken();

    if (authToken != null){
      try{
        
        var event:GroupEvent | null = null;

        event = <GroupEvent>await this.api.createGroupEvent(this.groupId, newEvent,authToken);
        
        if (event != null){
          this.router.navigate([`/groups/${this.groupId}`])
        }
      }catch(err){
        console.log(err);
      }
    }
  }

}
