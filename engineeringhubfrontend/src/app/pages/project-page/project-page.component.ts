import { LEADING_TRIVIA_CHARS } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
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
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.scss']
})
export class ProjectPageComponent implements OnInit {

  userProjectList: Project[] = [];
  projectCardType: CardType = CardType.ProjectView;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router) { }

  ngOnInit(): void {
    this.loadUserProjects();
  }

  async loadUserProjects(){
    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try{
        this.userProjectList = <Project[]>await this.api.getUserProjects(token);
      }catch (err){
        console.log(err);
      }
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


  createNewProjectProposal(){
    this.router.navigate(["project-proposal/new"]);
  }

  createNewProject(){
    this.router.navigate(["/projects/new-project"]);
  }

}
