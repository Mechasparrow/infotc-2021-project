import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Disclipline } from 'src/app/models/Disclipline';
import { Project } from 'src/app/models/Project';
import { Skill } from 'src/app/models/Skill';
import { ApiService } from 'src/app/services/api/api.service';

import { CardType } from '../result-card/result-card.component';

interface SearchResult {
  type: CardType,
  name: string,
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

  async onSubmit(){
    if (this.searchForm.get("searchFilter")?.value == "projects"){
      let searchQuery = this.searchForm.get("searchInput")?.value;
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
  }

}
