import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TokenStoreService } from '../token-store/token-store.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiEndpoint: string = "";

  constructor(http: HttpClient, tokenStore: TokenStoreService) {

  }

  userLogin(username:string,password:string){

  }

  userSignUp(username:string,password:string, confirmPassword:string){

  }
}
