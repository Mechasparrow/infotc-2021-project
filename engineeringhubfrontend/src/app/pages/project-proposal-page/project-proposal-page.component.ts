import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { ProjectProposal } from 'src/app/models/ProjectProposal';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-project-proposal-page',
  templateUrl: './project-proposal-page.component.html',
  styleUrls: ['./project-proposal-page.component.scss']
})
export class ProjectProposalPageComponent implements OnInit {

  projectProposal: ProjectProposal | null = null;
  proposalId: number = -1;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    let proposalIdRaw: string | null = this.activatedRoute.snapshot.paramMap.get("id");
    this.proposalId = proposalIdRaw != null ? parseInt(proposalIdRaw) : -1;
    this.loadProjectProposal();
  }

  async loadProjectProposal(){

    try{  
      this.projectProposal = <ProjectProposal> await this.api.getProjectProposal(this.proposalId);

      console.table(this.projectProposal);
    }catch(err){
      console.log(err);
    }

  }

  async createProjectFromProposal(){

    let authToken = this.tokenStore.getAuthenticationToken();

    if (authToken != null && this.projectProposal != null){
      try{

        let generatedProject: Project  = <Project> await this.api.createProjectFromProposal(this.projectProposal.id, authToken);
  
        //on success
        //projects/new-project/:id
        this.router.navigate([`/projects/new-project/${generatedProject.id}`]);
      }catch(err){
        console.log(err);
      }
    }
  }

}
