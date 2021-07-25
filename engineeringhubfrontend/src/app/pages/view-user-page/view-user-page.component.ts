import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Disclipline } from 'src/app/models/Disclipline';
import { Project } from 'src/app/models/Project';
import { Skill } from 'src/app/models/Skill';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

import { CardType } from 'src/app/share/result-card/result-card.component';

interface ProjectCardResult {
  id: number,
  name: string,
  description: string,
  attributes: string[]
};


@Component({
  selector: 'app-view-user-page',
  templateUrl: './view-user-page.component.html',
  styleUrls: ['./view-user-page.component.scss']
})
export class ViewUserPageComponent implements OnInit {

  userId: number = -1;
  loadedUser: User | null = null;
  userProjects: Project[] = [];

  projectCardType: CardType = CardType.ProjectView;


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
    this.grabPublicProjects();
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

  async grabPublicProjects(){
    try{
      this.userProjects = <Project[]> await this.api.getPublicProjectForUser(this.userId);
    }catch(err){
      console.log(err);
    }
  }

  async grabUser(){
    try{
      this.loadedUser = <User> await this.api.getUser(this.userId);
    }catch (err){
      console.log(err)
    }
  }

  ToProjectCardResults(projectList: Project[]): ProjectCardResult[] {
    return projectList.map((project: Project) => {
      return <ProjectCardResult>{
        id: project.id,
        name: project.name,
        description: project.description,
        attributes: project.project_discliplines.map((disclipline) => disclipline.name)
      }
    })
  }


  ViewProject(evt:any){
    let projectId: number = <number>evt;

    this.router.navigate([`/projects/${projectId}`]);
  }


}
