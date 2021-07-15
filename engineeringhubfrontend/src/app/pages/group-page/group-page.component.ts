import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/Group';
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
  groupCardType: CardType = CardType.GroupView;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserGroups();
  }

  ViewGroup(groupId:number){
    this.router.navigate([`/groups/${groupId}`]);
  }

  async loadUserGroups(){
    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try{
        this.userGroupList = <Group[]>await this.api.getUserGroups(token);
        console.log(this.userGroupList);
      }catch (err){
        console.log(err);
      }
    }
  }
}
