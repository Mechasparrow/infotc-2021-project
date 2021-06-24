import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {

  private TOKEN_SESSION_LOCATION:string = "infotc-token";

  constructor() { 

  }

  hasAuthenticationToken(): boolean {
    return sessionStorage.getItem(this.TOKEN_SESSION_LOCATION) != null;
  }

  setAuthenticationToken(token:string){
    console.log("token saved");
    sessionStorage.setItem(this.TOKEN_SESSION_LOCATION, token);
  }

  getAuthenticationToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_SESSION_LOCATION);
  }

  clearToken() {
    sessionStorage.clear();
  }
}
