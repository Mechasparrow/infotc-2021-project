import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disclipline } from 'src/app/models/Disclipline';
import { Skill } from 'src/app/models/Skill';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-view-user-page',
  templateUrl: './view-user-page.component.html',
  styleUrls: ['./view-user-page.component.scss']
})
export class ViewUserPageComponent implements OnInit {

  userId: number = -1;
  loadedUser: User | null = null;


  constructor(
    private api: ApiService,
    private tokenStore: TokenStoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    let userIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.userId = userIdRaw != null ? parseInt(userIdRaw) : -1;
  
    this.grabUser();
  }

  getUserDiscliplines(): string[]{
    if (this.loadedUser == null){
      return [];
    }

    return this.loadedUser.user_discliplines.map((disclipline: Disclipline) => {
      return disclipline.name;
    });
  }

  getUserSkills(): string[]{
    if (this.loadedUser == null){
      return [];
    }

    return this.loadedUser.user_skills.map((skill: Skill) => {
      return skill.name
    })
  }


  async grabUser(){
    try{
      this.loadedUser = <User> await this.api.getUser(this.userId);
    }catch (err){
      console.log(err)
    }
  }

}
