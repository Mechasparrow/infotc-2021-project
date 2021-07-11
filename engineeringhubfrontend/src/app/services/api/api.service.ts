import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStoreService } from '../token-store/token-store.service';
import { of } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { ProjectProposal } from 'src/app/models/ProjectProposal';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint: string = "http://127.0.0.1:8000/api/hub";

  constructor(private http: HttpClient, private tokenStore: TokenStoreService) {

  }

  async addUserSkill(skill:string, user_pk:number, authToken:string){
    //POST /skills/
    var payload = {
      name: skill
    }
    
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    
    return this.http.post(`${this.apiEndpoint}/users/${user_pk}/add_user_skill/`, payload, httpOptions).toPromise();
  }

  async addUserDisclipline(disclipline:string, user_pk:number, authToken:string){
    //POST /discliplines/
    var payload = {
      name: disclipline
    }

    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/users/${user_pk}/add_user_disclipline/`, payload,httpOptions).toPromise();
  }

  async userLogin(username:string,password:string){
    var payload = {
      username: username,
      password: password
    }

    return this.http.post(`${this.apiEndpoint}/users/user_login/`, payload).toPromise().then((data: any) => {
      var token = data["token"];
      this.tokenStore.setAuthenticationToken(token);
    });

  }

  async userLogout(token:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/users/user_logout/`, httpOptions).toPromise().then ((data:any) => {
      this.tokenStore.clearToken();
    });
  }

  async userSignUp(username:string,password:string, confirmPassword:string){
    var payload = {
      username: username,
      password: password,
      confirm_password: confirmPassword
    }

    return this.http.post(`${this.apiEndpoint}/users/user_signup/`, payload).toPromise().then((data: any) => {
      var token = data["token"];
      this.tokenStore.setAuthenticationToken(token);
    });
  }

  async getAuthUser(token:string){
    var httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Token ${token}`
        })
    }

    return this.http.get(`${this.apiEndpoint}/users/get_logged_in_user/`, httpOptions).toPromise();
  }

  async deleteProjectNote(noteId:number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.delete(`${this.apiEndpoint}/project-notes/${noteId}/deleteProjectNote/`, httpOptions).toPromise();
  }

  async getProjectNotes(projectId:number){
    //http://localhost:8000/api/hub/projects/1/getProjectNotes/
  
    return this.http.get(`${this.apiEndpoint}/projects/${projectId}/getProjectNotes/`).toPromise();
  }

  async getUserProject(projectId:number, token:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    }

    return this.http.get(`${this.apiEndpoint}/projects/${projectId}/getUserProject/`, httpOptions).toPromise();
  }

  async getUserProjects(token:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    }

    return this.http.get(`${this.apiEndpoint}/projects/viewUserProjects/`, httpOptions).toPromise();
  }

  async searchProjects(searchString:string){
    var payload = 
    {
      "search_query": searchString  
    }

    var httpOptions = {
      params: payload
    }

    return this.http.get(`${this.apiEndpoint}/projects/searchProjects/`, httpOptions).toPromise();
  }

  async searchUsers(searchString:string){
    var payload = 
    {
      "search_query": searchString  
    }

    var httpOptions = {
      params: payload
    }

    return this.http.get(`${this.apiEndpoint}/users/searchUsers/`, httpOptions).toPromise();
  }

  async searchProjectProposals(searchString: string){
    var payload = 
    {
      "search_query": searchString  
    }

    var httpOptions = {
      params: payload
    }

    return this.http.get(`${this.apiEndpoint}/project-proposals/searchProjectProposals/`, httpOptions).toPromise();
  }

  async searchGroups(searchString: string){
    var payload = 
    {
      "search_query": searchString  
    }

    var httpOptions = {
      params: payload
    }

    return this.http.get(`${this.apiEndpoint}/groups/searchGroups/`, httpOptions).toPromise();
  }
}
