import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectNote } from 'src/app/models/ProjectNote';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-view-project-page',
  templateUrl: './view-project-page.component.html',
  styleUrls: ['./view-project-page.component.scss']
})
export class ViewProjectPageComponent implements OnInit {

  projectNotes: ProjectNote[] = [];
  project: Project | null = null;
  projectId: number = -1;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute) {
    
  }

  ngOnInit(): void {
    let projectIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.projectId = projectIdRaw != null ? parseInt(projectIdRaw) : -1;
    this.getProjectNotes();
    this.getProject();
  }

  private sortDatesDescending(projectNoteA: ProjectNote, projectNoteB: ProjectNote): number {
  
    return ((new Date(projectNoteA.created)) < (new Date(projectNoteB.created))) ? 1 : -1;
  
  }

  async getProject(){
    let authToken = await this.tokenStore.getAuthenticationToken();
    
    if (authToken != null){
      try{
        this.project = <Project>await this.api.getUserProject(this.projectId,authToken);
        console.log(this.project);
      }catch(err){
        console.log(err);
      }
    }

  }

  getProjectSkills(){
    if (this.project != undefined){
      return this.project.project_skills.map((skill)=>skill.name)
    }else{
      return [];
    }
  }

  getProjectDiscliplines(){
    if (this.project != undefined){
      return this.project.project_discliplines.map((discliplines)=>discliplines.name)
    }else{
      return [];
    }
  }

  async getProjectNotes(){
    try{
      this.projectNotes = (<ProjectNote[]>await this.api.getProjectNotes(this.projectId)).sort(this.sortDatesDescending);
      console.log(this.projectNotes)
    }catch (err){
      console.log(err);
    }
  }

  async editProjectNote(noteId:number){

  }

  async deleteProjectNote(noteId:number){
    let authToken = await this.tokenStore.getAuthenticationToken();
    
    let confirmation = confirm("Are you sure?");

    if (authToken != null && confirmation == true){
      try{
        await this.api.deleteProjectNote(noteId,authToken);
        await this.getProjectNotes();
      }catch(err){
        console.log(err);
      }
    }
  }

  getPrettyDate(note: ProjectNote): string{
    let noteDate: Date = new Date(note.created);
    return `${noteDate.toLocaleDateString()} - ${noteDate.toLocaleTimeString()}`
  }

}
