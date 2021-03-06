import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStoreService } from '../token-store/token-store.service';
import { of } from 'rxjs';
import { Group } from 'src/app/models/Group';
import { ProjectProposal } from 'src/app/models/ProjectProposal';
import { ProjectNote } from 'src/app/models/ProjectNote';
import { Project } from 'src/app/models/Project';
import { Disclipline } from 'src/app/models/Disclipline';
import { Skill } from 'src/app/models/Skill';
import { User } from 'src/app/models/User';

import * as faker from 'faker';
import { GroupEvent } from 'src/app/models/GroupEvent';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  

  private apiEndpoint: string = "http://127.0.0.1:8000/api/hub";

  constructor(private http: HttpClient, private tokenStore: TokenStoreService) {

  }


  async ListUsers(){
    //make api request
    return this.http.get(`${this.apiEndpoint}/users/`).toPromise();
  }

  async ListPublicProjects(){
    return this.http.get(`${this.apiEndpoint}/projects/public/`).toPromise();
  }

  async createGroup(group:Group,authToken:string ){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/groups/`, group, httpOptions).toPromise();
  }

  async updateGroup(groupId:number, groupPartial: Group, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.put(`${this.apiEndpoint}/groups/${groupId}/`, groupPartial, httpOptions).toPromise();
  }


  async ListGroups(){
    return this.http.get(`${this.apiEndpoint}/groups/`).toPromise();
  }

  async ListProjectProposals(){
    return this.http.get(`${this.apiEndpoint}/project-proposals/`).toPromise();
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

  async createProjectNote(noteData: ProjectNote, projectId:number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/projects/${projectId}/createProjectNote/`, noteData, httpOptions).toPromise();
  }

  async getProjectNote(projectId: number, noteId: number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.get(`${this.apiEndpoint}/project-notes/${noteId}/`, httpOptions).toPromise();
  }

  async updateProjectNote(projectId:number, updatedNote: ProjectNote, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.put(`${this.apiEndpoint}/projects/${projectId}/updateProjectNote/`, updatedNote, httpOptions).toPromise();
 
  }

  async deleteProjectNote(noteId:number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.delete(`${this.apiEndpoint}/project-notes/${noteId}/deleteProjectNote/`, httpOptions).toPromise();
  }

  async deleteGroupEvent(eventId:number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.delete(`${this.apiEndpoint}/events/${eventId}/deleteGroupEvent/`, httpOptions).toPromise();
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

  async deleteUserProject(projectId: number, token: string) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    }

    return this.http.delete(`${this.apiEndpoint}/projects/${projectId}/deleteUserProject/`, httpOptions).toPromise();
  }

  async getUserProjects(token:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${token}`
      })
    }

    return this.http.get(`${this.apiEndpoint}/projects/viewUserProjects/`, httpOptions).toPromise();
  }

  async createProject(project: Project, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/projects/`, project, httpOptions).toPromise();
  
  }

  async updateProject(projectId:number, projectPartial: Project, skills: Skill[], discliplines: Disclipline[], authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    let payload = {
      project: projectPartial,
      skills: skills,
      discliplines: discliplines
    };

    return this.http.put(`${this.apiEndpoint}/projects/${projectId}/`, payload, httpOptions).toPromise();
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

  async getUserGroups(authToken:string){
    //getUserGroups
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.get(`${this.apiEndpoint}/groups/getUserGroups/`, httpOptions).toPromise();
  }

  async createProjectProposal(newProposal: ProjectProposal, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/project-proposals/`, newProposal, httpOptions).toPromise();
  }

  async getGroup(groupId:number){
    return this.http.get(`${this.apiEndpoint}/groups/${groupId}/`).toPromise();
  }

  async isOwnedByUser(groupId: number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.get(`${this.apiEndpoint}/groups/${groupId}/isOwnedByUser/`, httpOptions).toPromise();
  }

  async deleteGroup(groupId: number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.delete(`${this.apiEndpoint}/groups/${groupId}/deleteGroup/`, httpOptions).toPromise();
  }

  async getGroupUsers(groupId:number){
    
    return this.http.get(`${this.apiEndpoint}/groups/${groupId}/getGroupUsers/`).toPromise();
  }

  async getGroupEvents(groupId: number){
    return this.http.get(`${this.apiEndpoint}/groups/${groupId}/getGroupEvents/`).toPromise();
  }

  async getGroupEvent(eventId: number){
    return this.http.get(`${this.apiEndpoint}/events/${eventId}/`).toPromise();
  }

  async createGroupEvent(groupId: number, newEvent: GroupEvent,authToken: string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/groups/${groupId}/createGroupEvent/`, newEvent, httpOptions).toPromise();
  }

  async updateGroupEvent(groupId: number, eventPartial: GroupEvent, authToken: string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.put(`${this.apiEndpoint}/groups/${groupId}/updateGroupEvent/`, eventPartial, httpOptions).toPromise();
 
  }

  async getUser(userId: number){


    return this.http.get(`${this.apiEndpoint}/users/${userId}/`).toPromise();

  }

  async getProject(projectId: number){
    
    return this.http.get(`${this.apiEndpoint}/projects/${projectId}/`).toPromise();
  }

  async getProjectProposal(projectProposalId: number){
    
    return this.http.get(`${this.apiEndpoint}/project-proposals/${projectProposalId}/`).toPromise();
  }

  async createProjectFromProposal(proposalId: number, authToken: string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/project-proposals/${proposalId}/createProjectFromProposal/`, {}, httpOptions).toPromise();
  }

  async getPublicProjectForUser(userId: number){
    return this.http.get(`${this.apiEndpoint}/users/${userId}/getUserPublicProjects/`).toPromise(); 
  }

  async getGroupEventAttendees(eventId: number){
 
    return this.http.get(`${this.apiEndpoint}/events/${eventId}/attendees/`).toPromise(); 
  }

  async attendGroupEvent(eventId:number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }
    
    return this.http.post(`${this.apiEndpoint}/events/${eventId}/attend/`, {}, httpOptions).toPromise(); 
  }

  async unattendGroupEvent(eventId: number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }
    
    return this.http.delete(`${this.apiEndpoint}/events/${eventId}/unattend/`, httpOptions).toPromise(); 

  }
  
  async userJoinGroup(groupId: number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }

    return this.http.post(`${this.apiEndpoint}/groups/${groupId}/joinGroup/`, {}, httpOptions).toPromise();
  }

  async userLeaveGroup(groupId: number, authToken:string){
    var httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Token ${authToken}`
      })
    }
    
    return this.http.delete(`${this.apiEndpoint}/groups/${groupId}/leaveGroup/`, httpOptions).toPromise(); 

  }

}
