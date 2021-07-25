import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';
import { CardType } from 'src/app/share/result-card/result-card.component';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.scss']
})
export class GroupPageComponent implements OnInit {

  userGroupList: Group[] = [];
  user: User | null = null;
  
  groupCardType: CardType = CardType.GroupView;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserGroups();
    this.loadUser();
  }

  AddNewGroup(){
    this.router.navigate([`/groups/new-group`]);
  }

  ViewGroup(groupId:number){
    this.router.navigate([`/groups/${groupId}`]);
  }

  getUserOwnsGroup(group: Group): boolean{
    if (this.user == null){
      return false;
    }

    return this.user.id == group.owner;

  }


  async loadUser(){
    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try{
        this.user = <User> await this.api.getAuthUser(token);
      }catch (err){
        console.log(err);
      }
    }
  }

  async loadUserGroups(){
    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try{
        this.userGroupList = <Group[]>await this.api.getUserGroups(token);
        this.userGroupList.forEach((group: Group) => {
          console.table(group);
        })
        console.log(this.userGroupList);
      }catch (err){
        console.log(err);
      }
    }
  }
}
