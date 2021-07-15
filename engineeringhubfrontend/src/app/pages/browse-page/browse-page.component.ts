import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/models/Project';
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

  constructor(private api: ApiService) {

  }


  ngOnInit(): void {
    this.pullUsers();
    this.pullProjects();
  }

  userItemViewed(user: User): void {
    alert(`Navigating to User: ${user.id}`);
  }

  
  projectItemViewed(project: Project): void {
    alert(`Navigating to Project: ${project.id}`);
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

}
