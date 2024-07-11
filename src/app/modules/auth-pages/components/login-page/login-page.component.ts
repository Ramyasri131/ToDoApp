import { Component, EventEmitter, Output } from '@angular/core';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserCredentials } from '../../../../core/models/user-credentials';
import { AuthService } from '../../services/auth-service';
import { Subscription } from 'rxjs';
import { ResponseDetails } from '../../../../core/models/response-details';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [SignUpComponent, RouterModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  userCredentials: UserCredentials | undefined;
  inValidEmailMessage: string = "";
  inValidPasswordMessage: string = "";
  token: string = "";
  message: string = "";
  isPasswordVisible:boolean=false;

  userCredentialsForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  });

  constructor(private Authapi: AuthService, private router: Router) {

  }

  userDetailsSubmission() {
    var model = this.userCredentialsForm.value;
    this.inValidEmailMessage = "";
    this.inValidPasswordMessage = "";
    this.message = "";
    const control = this.userCredentialsForm.controls;
    if (model.Email == "" && model.Password == "") {
      this.inValidEmailMessage = "Please Enter Email";
      this.inValidPasswordMessage = "Please Enter password";
    }
    else if (model.Password == "") {
      this.inValidPasswordMessage = "Please Enter Password";
    }
    if (control['Email'].invalid) {
      if (model.Email == "") {
        this.inValidEmailMessage = "Please Enter  Email";
      }
      else {
        this.inValidEmailMessage = "Please Enter valid Email";
      }
    }
    else {
      if (!this.userCredentialsForm.invalid) {
        this.userCredentials = new UserCredentials();
        this.userCredentials.email = model.Email!;
        this.userCredentials.password = model.Password!;
        this.Authapi.fetchAuthToken(this.userCredentials).subscribe({
          next: t => {
            this.token = t;
            localStorage.setItem("AuthToken", this.token);
            this.router.navigate(['/dashboard']);
          },
          error: (errorResponse: any) => {
            console.log("Error Occured");
            this.userCredentialsForm.reset();
            this.message = errorResponse.error;
          },
          complete: () => console.info('complete')
        });
      }
    }
  }

  openSignUp() {
    this.router.navigate(['/sign-up']);
  }

  tooglePassword(){
    this.isPasswordVisible=!this.isPasswordVisible;
  }
}