import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectNote } from 'src/app/models/ProjectNote';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

export interface BasicNoteContent {
  content: string
}

@Component({
  selector: 'app-add-project-note-page',
  templateUrl: './add-project-note-page.component.html',
  styleUrls: ['./add-project-note-page.component.scss']
})
export class AddProjectNotePageComponent implements OnInit {

  projectId:number = -1;
  noteId:number = -1;
  retrievedNote: ProjectNote  = <ProjectNote>{};

  editting:boolean = false;

  noteForm = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
  })

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    let projectIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.projectId = projectIdRaw != null ? parseInt(projectIdRaw) : -1;

    
    let noteIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id2");
    this.noteId = noteIdRaw != null ? parseInt(noteIdRaw) : -1;

    if (noteIdRaw != null){
      this.editting = true;
      this.retrieveNoteToUpdate();
    }

  }

  async retrieveNoteToUpdate(){
    let authToken = await this.tokenStore.getAuthenticationToken();

    if (authToken != null){
      try{
        this.retrievedNote = <ProjectNote> await this.api.getProjectNote(this.projectId, this.noteId, authToken);
      
        if (this.retrievedNote != null){
          this.noteForm.get("title")?.setValue(this.retrievedNote.title);
          this.noteForm.get("content")?.setValue((<BasicNoteContent>this.retrievedNote.note).content);
        }

      }catch(err){
        console.log(err);
      }
    }
  }

  async createNote(noteToCreate:ProjectNote, authToken:string): Promise<ProjectNote>{
    return <ProjectNote> await this.api.createProjectNote(noteToCreate, this.projectId, authToken);
  }

  async updateNote(updatedNote: ProjectNote, authToken:string): Promise<ProjectNote>{
    this.retrievedNote.title = updatedNote.title;
    this.retrievedNote.note = updatedNote.note;

    return <ProjectNote> await this.api.updateProjectNote(this.projectId, this.retrievedNote, authToken );
  }

  async onSubmit(): Promise<void> {

    var basicNoteContent = <BasicNoteContent>{
      content: this.noteForm.get("content")?.value
    };

    var constructedNote: ProjectNote = <ProjectNote> {
      title: this.noteForm.get("title")?.value,
      note: basicNoteContent,
      created: new Date(Date.now()),
      relatedProject: this.projectId
    }

    let authToken = await this.tokenStore.getAuthenticationToken();

    if (authToken != null){
      try{
        
        var note:ProjectNote | null = null;

        if (this.editting){
          note = await this.updateNote(constructedNote,authToken);
        }else{
          note = await this.createNote(constructedNote,authToken);
        }
        
        if (note != null){
          this.router.navigate([`/projects/${this.projectId}`])
        }
      }catch(err){
        console.log(err);
      }
    }


  }

}
