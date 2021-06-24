import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent implements OnInit {

  signUpForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassowrd: new FormControl('', Validators.required),
  })

  constructor(private api: ApiService, private router: Router)  {
    this.signUpForm.validator = <ValidatorFn>this.passwordMatchValidator;
  }

  ngOnInit(): void {
  }

  async onSubmit(){
    try{
      await this.api.userSignUp(
        this.signUpForm.get("username")?.value, 
        this.signUpForm.get("password")?.value,
        this.signUpForm.get("confirmPassowrd")?.value);  

      this.router.navigate(["/profile"]);
      
    }catch(err) {
      alert("Unable to signup invalid username and non matching password. Please try again");
    }
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    var password = formGroup.get("password");
    var repeatPassword = formGroup.get("confirmPassowrd");

    if (password?.value !== repeatPassword?.value){
      return {
        "matching": "Passwords do not match"
      }
    }else{
      return null;
    }
  }
}
