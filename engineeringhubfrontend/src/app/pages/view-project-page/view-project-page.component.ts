import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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


  visitingUser: boolean = true;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute, private router: Router) {
    
  }

  ngOnInit(): void {
    let projectIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.projectId = projectIdRaw != null ? parseInt(projectIdRaw) : -1;
    this.getProjectNotes();
    this.getProject();

    console.log("init");
  }

  private sortDatesDescending(projectNoteA: ProjectNote, projectNoteB: ProjectNote): number {
  
    return ((new Date(projectNoteA.created)) < (new Date(projectNoteB.created))) ? 1 : -1;
  
  }

  async getProject(){
    let authToken = await this.tokenStore.getAuthenticationToken();
    

    if (authToken != null){
      try{
        this.project = <Project>await this.api.getUserProject(this.projectId,authToken);
        this.visitingUser = false;
        console.log("Logging project");
        console.log(this.project);
      }catch(err){
        console.log(err);
      }
    }

    if (this.visitingUser){
      try {
        this.project = <Project> await this.api.getProject(this.projectId);
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

  createProjectNote(){
    this.router.navigate([`projects/${this.projectId}/new-note`])
  }

  editProjectNote(noteId:number){
    this.router.navigate([`projects/${this.projectId}/new-note/${noteId}`]);
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

  EditProject(){
    this.router.navigate([`projects/new-project/${this.projectId}`]);
  }

  async DeleteProject(){

    let token = this.tokenStore.getAuthenticationToken();

    let confirmation:boolean = confirm("Are you sure you want to delete this?");

    if (token != null && confirmation){
      try{
        await this.api.deleteUserProject(this.projectId,token);
        this.router.navigate(['/projects/'])
      }catch (err){
        console.log(err);
      }
    }
  }

}
