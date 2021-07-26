import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { GroupEvent } from 'src/app/models/GroupEvent';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-view-group-page',
  templateUrl: './view-group-page.component.html',
  styleUrls: ['./view-group-page.component.scss']
})
export class ViewGroupPageComponent implements OnInit {

  authUser: User | null = null;
  group: Group = <Group>{name:"test"};


  groupUsers: User[] = [];
  groupId: number = -1;
  userOwnsGroup: boolean = false;
  groupEvents: GroupEvent[] = [];
  expandedEvents: GroupEvent[] = [];
  eventAttendees: {[key: number]: Promise<User[]>} = {};

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute, private router: Router) {
    
  }

  async ngOnInit(): Promise<void> {

    let groupIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.groupId = groupIdRaw != null ? parseInt(groupIdRaw) : -1;
    
    await this.loadAuthUser();
    this.getGroup();
    await this.CheckIfGroupOwner();
    this.obtainGroupUsers();
    this.obtainGroupEvents();
  }

  async loadAuthUser(){
    let apiToken:string | null = this.tokenStore.getAuthenticationToken();

    if (apiToken != null){
      try{
        this.authUser = <User> await this.api.getAuthUser(apiToken);
      }
      catch(err){
        console.log(err);
      }
    }
  }

  isUserAttendingEvent(groupEvent: GroupEvent){
    if (this.authUser != null){

      let locatedUser = groupEvent.users.find(user => user == this.authUser?.id);
      return locatedUser != undefined;
    }else{
      return false;
    }
  }

  EditGroup(){
    this.router.navigate([`groups/new-group/${this.groupId}`]);
  }

  async deleteGroupEvent(){

  }

  async DeleteGroupEvent(eventId: number){
    let authToken = await this.tokenStore.getAuthenticationToken();
    
    let confirmation = confirm("Are you sure?");

    if (authToken != null && confirmation == true){
      try{
        await this.api.deleteGroupEvent(eventId,authToken);
        await this.obtainGroupEvents();
      }catch(err){
        console.log(err);
      }
    }
  }

  AddGroupEvent(){
    this.router.navigate([`groups/${this.groupId}/new-event/`]);
  }

  EditGroupEvent(eventId: number){
    this.router.navigate([`groups/${this.groupId}/new-event/${eventId}`]);
  }

  async DeleteGroup(){

    let token = this.tokenStore.getAuthenticationToken();

    let confirmation:boolean = confirm("Are you sure you want to delete this?");

    if (token != null && confirmation){
      try{
        await this.api.deleteGroup(this.groupId,token);
        this.router.navigate(['/groups/'])
      }catch (err){
        console.log(err);
      }
    }
  }

  async obtainGroupUsers(){
    try{
      this.groupUsers = <User[]> await this.api.getGroupUsers(this.groupId);

      if (this.userOwnsGroup && this.authUser != null){
        this.groupUsers.push(this.authUser);
      }

    }catch(err){
      console.log(err);
    }
  }

  async obtainGroupEvents(){
    try{
      this.groupEvents = <GroupEvent[]> await this.api.getGroupEvents(this.groupId);

      this.groupEvents.forEach((groupEvent: GroupEvent) => {
        
        let attendees: Promise<User[]> = this.getEventAttendees(groupEvent);
        this.eventAttendees[groupEvent.id] = attendees;

      })
    }catch(err){
      console.log(err);
    }
  }


  getPrettyDate(event: GroupEvent): string{
    let eventTimeStart: Date = new Date(event.timeStart);
    let eventTimeEnd: Date = new Date(event.timeEnd);

    return `From ${eventTimeStart.toLocaleDateString()} : ${eventTimeStart.toLocaleTimeString()}  To ${eventTimeEnd.toLocaleDateString()} : ${eventTimeEnd.toLocaleTimeString()}`
  }

  async CheckIfGroupOwner(){
    let authToken:string|null = this.tokenStore.getAuthenticationToken();

    if (authToken){
      try{
        this.userOwnsGroup = <boolean>await this.api.isOwnedByUser(this.groupId, authToken);
        console.log(this.group);
      }catch(err){
        console.log(err);
      }
    }

  }

  async getGroup(){
    
    try{
      this.group = <Group>await this.api.getGroup(this.groupId);
      console.log(this.group);
    }catch(err){
      console.log(err);
    }
  
  }

  async getEventAttendees(event: GroupEvent) : Promise<User[]>{
    let eventMembers: User[] = [];

    try{

      eventMembers = <User[]> await this.api.getGroupEventAttendees(event.id); 
    
    }catch(err){
      console.log(err);
    }

    return eventMembers
  }

  expandEventMembers(event: GroupEvent){
    this.expandedEvents.push(event);
  }

  unExpandEventMembers(event: GroupEvent){
    this.expandedEvents = this.expandedEvents.filter((groupEvent: GroupEvent) => {
      return groupEvent != event;
    });
  }

  expandedEvent(event:GroupEvent){
    let returnedEvent = this.expandedEvents.find((groupEvent: GroupEvent) => groupEvent == event);

    return returnedEvent != undefined;
  }

  async attendEvent(event: GroupEvent){
    let userAuthToken: string | null = this.tokenStore.getAuthenticationToken();
    
    if (userAuthToken != null){  
      try{
        await this.api.attendGroupEvent(event.id, userAuthToken);
        await this.obtainGroupEvents();
      }catch(err){
        console.log(err);
      }
    }

  }

  async unattendEvent(event: GroupEvent){
    let userAuthToken: string | null = this.tokenStore.getAuthenticationToken();
    
    if (userAuthToken != null){  
      try{
        await this.api.unattendGroupEvent(event.id, userAuthToken);
        await this.obtainGroupEvents();
      }catch(err){
        console.log(err);
      }
    }
  }

  isUserInGroup(): boolean {
    let userInGroup : User | undefined = undefined;

    if (this.authUser != null){
      userInGroup = this.groupUsers.find((user: User) => user.id == this.authUser?.id);
    }

    return userInGroup != undefined;

  }

  async leaveGroup(){
    let authToken: string | null = this.tokenStore.getAuthenticationToken();

    if (authToken != null){
      try{
        //dummy code: hit join group api endpoint

        if (this.authUser != null){
          await this.api.userLeaveGroup(this.groupId, authToken);
        }
        
        //refresh code
        this.obtainGroupUsers();

      }catch(err){
        console.log(err);
      }
    }
  }

  async joinGroup(){
    let authToken: string | null = this.tokenStore.getAuthenticationToken();

    if (authToken != null){  
      try{
        //dummy code: hit leave group api endpoint
        if (this.authUser != null){
          await this.api.userJoinGroup(this.groupId, authToken);
        }

        //refresh code
        this.obtainGroupUsers();


      }catch(err){
        console.log(err);
      }
    }

  }

}
