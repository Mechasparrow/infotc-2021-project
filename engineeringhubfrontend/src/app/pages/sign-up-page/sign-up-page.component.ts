import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

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

  constructor() {
    this.signUpForm.validator = <ValidatorFn>this.passwordMatchValidator;
  }

  ngOnInit(): void {
  }

  onSubmit(){
    alert("Submit");
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
