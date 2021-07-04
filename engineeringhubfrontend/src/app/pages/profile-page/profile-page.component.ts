import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Disclipline } from 'src/app/models/Disclipline';
import { Skill } from 'src/app/models/Skill';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  authenticatedUser: User | undefined;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router) { 

  }

  async newSkillAdded(skill:string){
    let token = this.tokenStore.getAuthenticationToken();
    if (this.authenticatedUser != undefined && token != null){
      try {
        await this.api.addUserSkill(skill, this.authenticatedUser.id, token);
        await this.loadAuthenticatedUser();
      }catch (err){
        console.log(err);
      }
    }
  }

  getSkillsList(){
    if (this.authenticatedUser != undefined){
      return this.authenticatedUser.user_skills.map((skill)=>skill.name)
    }else{
      return [];
    }
  }

  async newDiscliplineAdded(disclipline:string){
    let token = this.tokenStore.getAuthenticationToken();
    if (this.authenticatedUser != undefined && token != null){
      try {
        await this.api.addUserDisclipline(disclipline, this.authenticatedUser.id, token);
        await this.loadAuthenticatedUser();
      }catch (err){
        console.log(err);
      }
    }
  }

  getDiscliplinesList(){
    if (this.authenticatedUser != undefined){
      return this.authenticatedUser.user_discliplines.map((disclipline)=> disclipline.name)
    }else{
      return [];
    }
  }

  async logout(){
    let token = this.tokenStore.getAuthenticationToken();
    
    if (token != null){
      try {
        await this.api.userLogout(token);
      }catch (err) {
        console.log(err);
        alert("Auth error: going back home");
      }
    }

    this.goBackHome();
  }

  ngOnInit(): void {
    console.log("loading authenticated user");
    this.loadAuthenticatedUser();  
  }

  async loadAuthenticatedUser() {
    let token = this.tokenStore.getAuthenticationToken();
    
    if (token != null){
      try {
        this.authenticatedUser = <User> await this.api.getAuthUser(token);
        console.log(`Logged In: ${this.authenticatedUser.username}`);
      }catch (err) {
        console.log(err);
        alert("Auth error: going back home");
        this.goBackHome();
      }
    }else{
      this.goBackHome();
    }
  }

  goBackHome() {
    this.router.navigate(['/']);
  }

  navigateToProjects(){
    this.router.navigate(['/projects']);
  }
}
