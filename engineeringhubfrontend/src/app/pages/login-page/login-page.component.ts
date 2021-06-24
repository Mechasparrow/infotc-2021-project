import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  formValid: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  constructor(private api: ApiService, private router: Router) { 

  }

  ngOnInit(): void {
  }

  async onSubmit(){
    try{
      await this.api.userLogin(
        this.loginForm.get("username")?.value, 
        this.loginForm.get("password")?.value);  

      this.router.navigate(["/profile"]);
      
    }catch(err) {
      alert("Unable to login invalid username and/or password. Please try again");
    }
  }

}
