import { Component, OnInit } from '@angular/core';
import { Group } from 'src/app/models/Group';
import { Project } from 'src/app/models/Project';
import { ProjectProposal } from 'src/app/models/ProjectProposal';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnInit {

  users: User[] | null = null;
  projects: Project[] | null = null;
  groups: Group[] | null = null;
  proposals: ProjectProposal[] | null = null;

  constructor(private api: ApiService) {

  }


  ngOnInit(): void {
    this.pullUsers();
    this.pullProjects();
    this.pullGroups();
    this.pullProposals();
  }

  userItemViewed(user: User): void {
    alert(`Navigating to User: ${user.id}`);
  }

  
  projectItemViewed(project: Project): void {
    alert(`Navigating to Project: ${project.id}`);
  }

  groupItemViewed(group: Group): void {
    alert(`Navigating to Group: ${group.id}`);
  }

  proposalItemViewed(proposal: ProjectProposal): void {
    alert(`Navigating to Proposal: ${proposal.id}`);
  }

  async pullUsers(){
    try{
      this.users = <User[]> await this.api.ListUsers();  
      console.log(this.users);
    }catch (err){
      console.log(err);
    }
  }

  async pullProjects(){
    try{
      this.projects = <Project[]> await this.api.ListPublicProjects();
    }catch (err){
      console.log(err);
    }
  }

  async pullGroups(){
    try{
      this.groups = <Group[]> await this.api.ListGroups();
    }catch (err){
      console.log(err);
    }
  }

  async pullProposals(){
    try{
      this.proposals = <ProjectProposal[]> await this.api.ListProjectProposals();
    }catch (err){
      console.log(err);
    }
  }

}
