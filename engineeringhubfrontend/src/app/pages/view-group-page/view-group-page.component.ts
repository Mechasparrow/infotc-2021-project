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

  group: Group = <Group>{name:"test"};
  groupUsers: User[] = [];
  groupId: number = -1;
  userOwnsGroup: boolean = false;
  groupEvents: GroupEvent[] = [];

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {

    let groupIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.groupId = groupIdRaw != null ? parseInt(groupIdRaw) : -1;
    this.getGroup();
    this.CheckIfGroupOwner();
    this.obtainGroupUsers();
    this.obtainGroupEvents();
  }

  EditGroup(){

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
    }catch(err){
      console.log(err);
    }
  }

  async obtainGroupEvents(){
    try{
      this.groupEvents = <GroupEvent[]> await this.api.getGroupEvents(this.groupId);
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

}
