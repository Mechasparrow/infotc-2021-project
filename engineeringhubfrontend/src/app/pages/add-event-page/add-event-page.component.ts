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
  eventId: number = -1;
  loadedEvent: GroupEvent | null = null;

  groupEventForm: FormGroup = new FormGroup({
    name: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    location: new FormControl("" ,Validators.required),
    "timestart-date": new FormControl(this.getDayString(this.defaultDate), Validators.required),
    "timeend-date": new FormControl(this.getDayString(this.defaultDate), Validators.required),
    "timestart-time": new FormControl(this.getTimeString(this.defaultDate), Validators.required),
    "timeend-time": new FormControl(this.getTimeString(this.defaultDate), Validators.required)
  });

  private getDayString(date: Date){
    return formatDate(date, 'yyyy-MM-dd', 'en');
  }

  private getTimeString(date: Date){
    return formatDate(date, 'HH:mm', 'en')
  }

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let groupIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.groupId = groupIdRaw != null ? parseInt(groupIdRaw) : -1;

    let eventIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id2");
    this.eventId = eventIdRaw != null ? parseInt(eventIdRaw) : -1;

    if (eventIdRaw != null){
      this.editting = true;
      this.retrieveEventForUpdate();
    }
  }

  async retrieveEventForUpdate(){
    try{
      this.loadedEvent = <GroupEvent> await this.api.getGroupEvent(this.eventId);
      console.log(this.loadedEvent);
      if (this.loadedEvent!=null){
        this.groupEventForm.get("name")?.setValue(this.loadedEvent.name);
        this.groupEventForm.get("description")?.setValue(this.loadedEvent.description);
        this.groupEventForm.get("location")?.setValue(this.loadedEvent.location);
      
        let startDate = new Date(this.loadedEvent.timeStart);
        let endDate = new Date(this.loadedEvent.timeEnd);
      
        this.groupEventForm.get("timestart-date")?.setValue(this.getDayString(startDate));
        this.groupEventForm.get("timeend-date")?.setValue(this.getDayString(endDate));
        this.groupEventForm.get("timestart-time")?.setValue(this.getTimeString(startDate));
        this.groupEventForm.get("timeend-time")?.setValue(this.getTimeString(endDate));
      }
    } catch(err){
      console.log(err);
    }
  }

  createDate(date:string, time: string): Date {
    let dateString = date + " " + time;

    let parsedDate = moment(dateString, "YYYY-MM-DD hh:mm").toDate();

    return parsedDate;
  }

  async updateEvent(eventPartial: GroupEvent, authToken:string){
    eventPartial.id = this.eventId;

    return <GroupEvent>await this.api.updateGroupEvent(this.groupId, eventPartial, authToken);
  }

  async createEvent(newEvent: GroupEvent, authToken: string){
    return <GroupEvent>await this.api.createGroupEvent(this.groupId, newEvent,authToken);
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

    let authToken = await this.tokenStore.getAuthenticationToken();

    if (authToken != null){
      try{
        
        var returnedEvent:GroupEvent | null = null;

        //returnedEvent = <GroupEvent>await this.api.createGroupEvent(this.groupId, newEvent,authToken);
        
        if (this.editting){
          returnedEvent = await this.updateEvent(newEvent, authToken);
        }else{
          returnedEvent = await this.createEvent(newEvent, authToken);
        }


        if (returnedEvent != null){
          this.router.navigate([`/groups/${this.groupId}`])
        }
      }catch(err){
        console.log(err);
      }
    }
  }

}
