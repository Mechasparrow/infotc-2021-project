import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Disclipline } from 'src/app/models/Disclipline';
import { Project } from 'src/app/models/Project';
import { Skill } from 'src/app/models/Skill';
import { User } from 'src/app/models/User';
import {Group} from 'src/app/models/Group';

import { ApiService } from 'src/app/services/api/api.service';

import { CardType } from '../result-card/result-card.component';
import { ProjectProposal } from 'src/app/models/ProjectProposal';
import { Router } from '@angular/router';

interface SearchResult {
  id: number,
  type: CardType,
  name: string,
  genericName: string,
  description: string,
  attributes: string[]
}

@Component({
  selector: 'MainSearch',
  templateUrl: './main-search.component.html',
  styleUrls: ['./main-search.component.scss']
})
export class MainSearchComponent implements OnInit {

  searchForm: FormGroup = new FormGroup({
    searchFilter: new FormControl("projects"),
    searchInput: new FormControl("")
  })

  searchResults:SearchResult[] = [];

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {

  }

  viewCard(event: any){
    let baseUrlFragment = "users";

    let cardType = <CardType> event.type;

    switch (cardType){
      case CardType.ProjectView:
        baseUrlFragment = "projects";
        break;
      case CardType.GroupView:
        baseUrlFragment = "groups";
        break;
      case CardType.ProjectProposalView:
        baseUrlFragment = "proposals";
        break;
      case CardType.UserView:
        baseUrlFragment = "users";
        break;
    }

    
    let navigateUrl = `${baseUrlFragment}/${event.id}`;
    
    this.router.navigate([navigateUrl]);
    
  }

  async projectSearch(searchQuery: string){

    let projectSearchResults = <Project[]> (await this.api.searchProjects(searchQuery));

    this.searchResults = (<Project[]>projectSearchResults).map ((projectResult: Project) => {
      return <SearchResult>{
        id: projectResult.id,
        type: CardType.ProjectView,
        name: projectResult.name,
        description: projectResult.description,
        attributes: projectResult.project_discliplines.map((disclipline:Disclipline) => disclipline.name)
      }
    });
  }

  async userSearch(searchQuery: string){
    let userSearchResults = <User[]> (await this.api.searchUsers(searchQuery));

    this.searchResults = (<User[]>userSearchResults).map ((userSearchResult: User) => {
      return <SearchResult>{
        id: userSearchResult.id,
        type: CardType.UserView,
        genericName: userSearchResult.username
      }
    });
  }

  async groupSearch(searchQuery:string){
    let groupSearchResults = <Group[]> (await this.api.searchGroups(searchQuery));

    this.searchResults = (<Group[]>groupSearchResults).map ((groupSearchResult: Group) => {
      return <SearchResult>{
        id: groupSearchResult.id,
        type: CardType.GroupView,
        genericName: groupSearchResult.name
      }
    });
  }

  async projectProposalSearch(searchQuery:string){
    console.log("Search project propasls");
    let projectProposalSearchResults = <ProjectProposal[]> (await this.api.searchProjectProposals(searchQuery));

    this.searchResults = (<ProjectProposal[]>projectProposalSearchResults).map ((projectProposalSearchResult: ProjectProposal) => {
      return <SearchResult>{
        id: projectProposalSearchResult.id,
        type: CardType.ProjectProposalView,
        name: projectProposalSearchResult.name,
        description: projectProposalSearchResult.description
      }
    });
  }

  async onSubmit(){
    if (this.searchForm.get("searchFilter")?.value != null){
      let searchFilter = this.searchForm.get("searchFilter")?.value;
      let searchQuery = this.searchForm.get("searchInput")?.value;
      
      console.log({filter: searchFilter})

      switch (searchFilter){
        case "projects":
          await this.projectSearch(searchQuery);
          return;
        case "project-proposals":
          await this.projectProposalSearch(searchQuery);
          return;
        case "users":
          await this.userSearch(searchQuery);
          return;
        case "groups":
          await this.groupSearch(searchQuery);
          return;
      }
    }
  }

}
