import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  getSkillsList(){
    if (this.authenticatedUser != undefined){
      return this.authenticatedUser.user_skills.map((skill)=>skill.name)
    }else{
      return [];
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

  goBackHome() {
    this.router.navigate(['/']);
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

}
