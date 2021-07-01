import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { CardType } from '../result-card/result-card.component';

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

  searchResults:any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(){
    alert(JSON.stringify(this.searchForm.value));
  }

}
