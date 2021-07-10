import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Disclipline } from 'src/app/models/Disclipline';
import { Project } from 'src/app/models/Project';
import { Skill } from 'src/app/models/Skill';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';

import { CardType } from '../result-card/result-card.component';

interface SearchResult {
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

  constructor(private api: ApiService) { }

  ngOnInit(): void {

  }

  async projectSearch(searchQuery: string){

    let projectSearchResults = <Project[]> (await this.api.searchProjects(searchQuery));

    this.searchResults = (<Project[]>projectSearchResults).map ((projectResult: Project) => {
      return <SearchResult>{
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
        type: CardType.UserView,
        genericName: userSearchResult.username
      }
    });
  }

  async groupSearch(searchQuery:string){
    alert("not implemented");
  }

  async projectProposalSearch(searchQuery:string){
    alert("not implemented");
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
