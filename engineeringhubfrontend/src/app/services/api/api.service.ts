import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TokenStoreService } from '../token-store/token-store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint: string = "http://127.0.0.1:8000/api/hub";

  constructor(private http: HttpClient, private tokenStore: TokenStoreService) {

  }

  //TODO
  async addUserSkill(skill:string, authToken:string){
    //POST /skills/
    var payload = {
      name: skill
    }
    
    return this.http.post(`${this.apiEndpoint}/skills/`, payload).toPromise();
  }

  //TODO
  async addUserDisclipline(disclipline:string, authToken:string){
    //POST /discliplines/
    var payload = {
      name: disclipline
    }

    return this.http.post(`${this.apiEndpoint}/discliplines/`, payload).toPromise();
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
}
