import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectProposal } from 'src/app/models/ProjectProposal';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'app-add-project-proposal-page',
  templateUrl: './add-project-proposal-page.component.html',
  styleUrls: ['./add-project-proposal-page.component.scss']
})
export class AddProjectProposalPageComponent implements OnInit {

  proposalForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  })

  editting:boolean = false;

  constructor(private api: ApiService, private tokenStore: TokenStoreService, private router: Router) { 


  }

  ngOnInit(): void {
  }

  async onSubmit(){

    let constructedProposal: ProjectProposal = <ProjectProposal>{
      name: this.proposalForm.get("name")?.value,
      description: this.proposalForm.get("description")?.value
    }

    let token = this.tokenStore.getAuthenticationToken();

    if (token != null){
      try {
        await this.api.createProjectProposal(constructedProposal, token);
        alert("proposal created");
        this.router.navigate(['/projects']);
      }catch(err){
        
      }
    }

  }

}
