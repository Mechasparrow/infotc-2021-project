import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Disclipline } from 'src/app/models/Disclipline';
import { Project } from 'src/app/models/Project';
import { Skill } from 'src/app/models/Skill';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-add-new-project',
  templateUrl: './add-new-project.component.html',
  styleUrls: ['./add-new-project.component.scss']
})
export class AddNewProjectComponent implements OnInit {

  projectForm: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    complete: new FormControl(false, Validators.required),
    private: new FormControl(false, Validators.required),
    skills: new FormControl(<Skill[]>[]),
    discliplines: new FormControl(<Disclipline[]>[])
  })

  projectId: number = -1;
  project: Project | null = null;
  editting: boolean = false;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    let projectIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.projectId = projectIdRaw != null ? parseInt(projectIdRaw) : -1;

    if (projectIdRaw != null){
      this.editting = true;
      this.retrieveProjectToUpdate();
    }
  }

  async retrieveProjectToUpdate(){
    let authToken = await this.tokenStore.getAuthenticationToken();
    
    if (authToken != null){
      try{
        this.project = <Project>await this.api.getUserProject(this.projectId,authToken);
        
        this.projectForm.get('name')?.setValue(this.project.name);
        this.projectForm.get('description')?.setValue(this.project.description);
        this.projectForm.get('complete')?.setValue(this.project.complete);
        this.projectForm.get('private')?.setValue(this.project.private);

        this.projectForm.get('skills')?.setValue(this.project.project_skills);
        this.projectForm.get('discliplines')?.setValue(this.project.project_discliplines);

      }catch(err){
        console.log(err);
      }
    }

  }

  newSkillAdded(skill:string){
    let skills:Skill[] = this.projectForm.get("skills")?.value;
    
    let newSkill: Skill = <Skill>{
      name: skill
    }
    
    console.log(skills);
    skills.push(newSkill);

    this.projectForm.get("skills")?.setValue(skills);

  }

  newDiscliplineAdded(disclipline:string){
    let discliplines:Disclipline[] = this.projectForm.get("discliplines")?.value;

    let newDisclipline: Disclipline = <Disclipline>{
      name: disclipline
    }

    discliplines.push(newDisclipline);

    this.projectForm.get("discliplines")?.setValue(discliplines);
  }


  getProjectSkills(){
    if (this.project != undefined){
      return this.projectForm.get("skills")?.value.map((skill: Skill)=>skill.name)
    }else{
      return [];
    }
  }

  getProjectDiscliplines(){
    if (this.project != undefined){
      return this.projectForm.get("discliplines")?.value.map((disclipline: Disclipline)=>disclipline.name)
    }else{
      return [];
    }
  }

  async createProject(createdProject: Project, token:string): Promise<Project>{
    return <Project>await this.api.createProject(createdProject, token);
  }

  async updateProject(projectPartial: Project, skills:Skill[], discliplines:Disclipline[], token:string): Promise<Project>{
    return <Project>await this.api.updateProject(this.projectId, projectPartial, skills, discliplines, token);
  }

  async onSubmit(): Promise<void>{
    let createdProject: Project = <Project>{
      name: this.projectForm.get("name")?.value,
      description: this.projectForm.get("description")?.value,
      complete: <boolean>this.projectForm.get("complete")?.value,
      private: <boolean>this.projectForm.get("private")?.value,
      created: new Date(Date.now())
    };

    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try {

        let returnedProject: Project | null = null;
        
        if (this.editting){
          let projectSkills: Skill[] = this.projectForm.get("skills")?.value;
          let projectDiscliplines: Disclipline[] = this.projectForm.get("discliplines")?.value;

          returnedProject = await this.updateProject(createdProject, projectSkills,projectDiscliplines,token);
        }else{
          returnedProject = await this.createProject(createdProject, token);
        }
  
        if (returnedProject){
          this.router.navigate([`/projects/${returnedProject?.id}`]);
        }

      }catch(err){
        console.log(err)
      }
    }
  }
}
