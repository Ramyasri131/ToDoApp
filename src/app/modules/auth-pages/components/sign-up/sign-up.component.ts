import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredentials } from '../../../../core/models/user-credentials';
import { Subscription } from 'rxjs';
import { ResponseDetails } from '../../../../core/models/response-details';
import { AuthService } from '../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  @Output() signUpCompleteEvent=new EventEmitter<ResponseDetails>();
  invalidEmailMessage:string="";
  invalidPasswordMessage:string="";
  userCredentials:UserCredentials|undefined;
  userRegistrationSubscription:Subscription|undefined;
  responseDetails:ResponseDetails={isSuccess:false,message:""};
  message:string="";
  

  userCredentialsForm = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  });
  
  constructor(private registerApi:AuthService,private router:Router){

  }

  submitUserDetails(){
    var model = this.userCredentialsForm.value;
    const control = this.userCredentialsForm.controls;
    this.message="";
    this.invalidEmailMessage = "";
    this.invalidPasswordMessage = "";
    if (model.Email == "" && model.Password == "") {
      this.invalidEmailMessage = "Please Enter Email";
      this.invalidPasswordMessage = "Please Enter password";
    }
    else if (model.Email == "") {
      this.invalidEmailMessage = "Please Enter Email";
    }
    else if (model.Password == "") {
      this.invalidPasswordMessage = "Please Enter Password";
    }
    if (control['Email'].invalid) {
      this.invalidEmailMessage = "Please Enter valid Email";
    }
    else {
      if (!this.userCredentialsForm.invalid) {
        this.userCredentials = new UserCredentials();
        this.userCredentials.email = model.Email!;
        this.userCredentials.password = model.Password!;
        this.userRegistrationSubscription = this.registerApi.registerUser(this.userCredentials).subscribe({
          next: t => {
            this.responseDetails.isSuccess=true;
            this.responseDetails.message="Sign up successfull";
            this.router.navigate(['/login']);
            this.signUpCompleteEvent.emit(this.responseDetails);
          },
          error: (errorResponse: any) => {
            console.log("Error Occured");
            this.userCredentialsForm.reset();
            this.message = errorResponse.error;
            this.responseDetails.isSuccess=false;
            this.responseDetails.message=errorResponse.error;
            this.signUpCompleteEvent.emit(this.responseDetails);
          },
          complete: () => console.info('complete')
        });
      }
    }
  }

  openLogin(){
    this.router.navigate(['/login']);
  }
}
