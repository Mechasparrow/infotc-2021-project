import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { ApiService } from 'src/app/services/api/api.service';


@Component({
  selector: 'app-browse-page',
  templateUrl: './browse-page.component.html',
  styleUrls: ['./browse-page.component.scss']
})
export class BrowsePageComponent implements OnInit {

  users: User[] | null = null;

  constructor(private api: ApiService) {

  }


  ngOnInit(): void {
    this.pullUsers();
  }

  async pullUsers(){
    try{
      //TODO pull users here
      this.users = <User[]> await this.api.ListUsers();  
      console.log(this.users);
    }catch (err){
      console.log(err);
    }
  }

}
