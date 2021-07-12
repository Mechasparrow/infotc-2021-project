import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { TokenStoreService } from 'src/app/services/token-store/token-store.service';

@Component({
  selector: 'Navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  token: string | null = null;

  constructor(private tokenStore: TokenStoreService, private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.token = this.tokenStore.getAuthenticationToken()
  }
  
  async logout(){
    let token = this.tokenStore.getAuthenticationToken();
    
    if (token != null){
      try {
        await this.api.userLogout(token);
      }catch (err) {
        console.log(err);
        alert("Auth error: going back home");
      }
    }

    this.token = this.tokenStore.getAuthenticationToken();
    this.router.navigate(['/']);
  }
}
